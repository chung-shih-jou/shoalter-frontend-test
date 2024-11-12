import { get } from "lodash";
import { apiHost } from "../../config/envConfig";
import { RECOMMEND_ACTIONS } from "../actions";
import { RecommendActions } from "../reducers/recommends";
import API from "./handler";
import MOCK from "../../mock/app.mock.json";

export const getList =
  (data = { size: 10 }) =>
  async (dispatch) => {
    // const res = await API.GET(
    //   apiHost + `/rss/topgrossingapplications/limit=${data.size}/json`
    // );
    const res = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: MOCK }), 2000)
    );
    console.log(res);
    if (!res.error)
      return dispatch(
        RecommendActions[RECOMMEND_ACTIONS.SET_LIST](
          get(res, "data.feed.entry", [])
        )
      );
    if (!res.error)
      return dispatch({ type: RECOMMEND_ACTIONS.SET_LIST, data: res.data });
    return res;
  };
