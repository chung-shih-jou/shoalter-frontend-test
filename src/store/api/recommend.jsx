import { get } from "lodash";
import { apiHost } from "../../config/envConfig";
import { RECOMMEND_ACTIONS } from "../actions";
import { RecommendActions } from "../reducers/recommends";
import API from "./handler";

export const getList =
  (data = { size: 10 }) =>
  async (dispatch) => {
    const res = await API.GET(
      apiHost + `/rss/topgrossingapplications/limit=${data.size}/json`
    );
    if (!res.error)
      return dispatch(
        RecommendActions[RECOMMEND_ACTIONS.SET_LIST](get(res, "feed.entry", []))
      );

    return dispatch(
      AppActions[RECOMMEND_ACTIONS.SET_ERROR]({
        data: res.error,
      })
    );
  };
