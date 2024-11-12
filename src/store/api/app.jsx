import { apiHost } from "../../config/envConfig";
import { APP_ACTIONS } from "../actions";
import { AppActions } from "../reducers/apps";
import API from "./handler";
import MOCK from "../../mock/app.mock.json";
import { get } from "lodash";
import { ApiMethodTypes } from "@/utils/define.type";

export const getList =
  (data = { size: 10 }) =>
  async (dispatch) => {
    // const res = await API.GET(
    //   apiHost + `/rss/topfreeapplications/limit=${data.size}/json`
    // );
    const res = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: MOCK }), 2000)
    );
    console.log(res);
    if (!res.error)
      return dispatch(
        AppActions[APP_ACTIONS.SET_LIST](get(res, "data.feed.entry", []))
      );
    return res;
  };

export const getDetailByIds = (ids) => async (dispatch) => {
  const res = await API.GET(apiHost + `/lookup`, { id: ids.join(",") });
  if (!res.error) {
    const data = get(res, "results", []);
    dispatch(
      AppActions[APP_ACTIONS.CUD_LIST]({
        data: data.map((item, idx) => ({ detail: item, id: ids[idx] })),
        method: ApiMethodTypes.BULK_UPDATE,
      })
    );
    return dispatch(AppActions[APP_ACTIONS.SET_CURRENT](data));
  }
  return res;
};

export const getOne = (id) => async (dispatch) => {
  const res = await API.GET(apiHost + `/lookup`, { id });
  if (!res.error) {
    const data = get(res, "results[0]", []);
    return dispatch(AppActions[APP_ACTIONS.SET_CURRENT](data));
  }
  return res;
};
