import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { get } from "lodash";

import { apiHost } from "@/config/envConfig";
import { RECOMMEND_ACTIONS } from "../actions";
import { RecommendActions } from "../reducers/recommends";
import API from "./handler";
import { safeJsonParse } from "@/utils/method";
import { cahceExpireTime } from "@/utils/define";

export const getList =
  (data = { size: 10 }) =>
  async (dispatch: Dispatch<UnknownAction>) => {
    let localStorageData = safeJsonParse(
      localStorage.getItem(RECOMMEND_ACTIONS.SET_LIST) as string
    );
    if (
      !localStorageData ||
      localStorageData.expireTime < new Date().getTime()
    ) {
      const res = await API.GET(
        apiHost + `/rss/topgrossingapplications/limit=${data.size}/json`
      );
      localStorageData = get(res, "feed.entry", []);
      if (!!res.error)
        return dispatch(
          RecommendActions[RECOMMEND_ACTIONS.SET_ERROR]({
            data: res.error,
          })
        );
      localStorage.setItem(
        RECOMMEND_ACTIONS.SET_LIST,
        JSON.stringify({
          expireTime: new Date().getTime() + cahceExpireTime,
          data: localStorageData,
        })
      );
    } else {
      localStorageData = localStorageData.data;
    }

    return dispatch(
      RecommendActions[RECOMMEND_ACTIONS.SET_LIST](localStorageData)
    );
  };
