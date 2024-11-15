import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { get, isEmpty, map } from "lodash";

import { apiHost } from "@/config/envConfig";
import { APP_ACTIONS } from "../actions";
import { AppActions } from "../reducers/apps";
import API from "./handler";
import { ApiMethodTypes } from "@/utils/define.type";
import { safeJsonParse } from "@/utils/method";
import { cahceExpireTime } from "@/utils/define";

export const getList =
  (data = { size: 10 }) =>
  async (dispatch: Dispatch<UnknownAction>) => {
    let localStorageData = safeJsonParse(
      localStorage.getItem(APP_ACTIONS.SET_LIST) as string
    );
    if (
      !localStorageData ||
      localStorageData.expireTime < new Date().getTime()
    ) {
      const res = await API.GET(
        apiHost + `/rss/topfreeapplications/limit=${data.size}/json`
      );
      localStorageData = get(res, "feed.entry", []);
      if (!!res.error)
        return dispatch(
          AppActions[APP_ACTIONS.SET_ERROR]({
            data: res.error,
          })
        );
      localStorage.setItem(
        APP_ACTIONS.SET_LIST,
        JSON.stringify({
          expireTime: new Date().getTime() + cahceExpireTime,
          data: localStorageData,
        })
      );
    } else {
      localStorageData = localStorageData.data;
    }
    return dispatch(AppActions[APP_ACTIONS.SET_LIST](localStorageData));
  };

export const getDetailByIds =
  (ids: number[]) => async (dispatch: Dispatch<UnknownAction>) => {
    const localStorageData = safeJsonParse(
      localStorage.getItem(APP_ACTIONS.CUD_LIST) as string
    ) || { data: [] };

    let includesLocalStorageData = localStorageData.data.filter(
      (d = { id: -1 }) => ids.includes(d.id)
    );

    const localStorageIds = map(includesLocalStorageData, "id");
    const newIds = ids.filter((id) => !localStorageIds.includes(id));

    if (!isEmpty(newIds)) {
      const res = await API.GET(apiHost + `/lookup`, { id: newIds.join(",") });
      const data = get(res, "results", []).map((item: any, idx: number) => ({
        detail: item,
        id: ids[idx],
      }));
      localStorageData.data = localStorageData.data.concat(data);
      includesLocalStorageData = includesLocalStorageData.concat(data);
      if (!!res.error)
        return dispatch(
          AppActions[APP_ACTIONS.SET_ERROR]({
            data: res.error,
          })
        );

      localStorage.setItem(
        APP_ACTIONS.CUD_LIST,
        JSON.stringify({
          expireTime: new Date().getTime() + cahceExpireTime,
          data: localStorageData.data,
        })
      );
    }

    return dispatch(
      AppActions[APP_ACTIONS.CUD_LIST]({
        data: includesLocalStorageData,
        method: ApiMethodTypes.BULK_UPDATE,
      })
    );
  };

// export const getOne = (id) => async (dispatch) => {
//   const res = await API.GET(apiHost + `/lookup`, { id });
//   if (!res.error) {
//     const data = get(res, "results[0]", []);
//     return dispatch(AppActions[APP_ACTIONS.SET_CURRENT](data));
//   }
//   return dispatch(
//     AppActions[APP_ACTIONS.SET_ERROR]({
//       data: res.error,
//     })
//   );
// };
