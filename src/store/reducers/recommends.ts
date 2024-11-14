import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

import { RECOMMEND_ACTIONS as actions } from "../actions";
import { defaultPagination, initialState } from "../initialState";
import { handleState } from "../utils";

const { recommend } = initialState;
const clearCurrent = (state: any) => ({ ...state, current: {}, error: false });
const clearList = (state: any) => ({
  ...state,
  list: {},
  error: false,
  ...defaultPagination,
});

const setList = (state: any, action: { payload: any; type: string }) => {
  const data = action.payload || [];
  return { ...state, list: data, error: false };
};

const setCurrent = (state: any, action: { payload: any; type: string }) => {
  const data = action.payload || {};
  return { ...state, current: data, error: false };
};

const actionCurrent = (state: any, action: { payload: any; type: string }) => {
  const data = action.payload || {};
  // do something
  return { ...state, current: data, error: false };
};

const actionList = (state: any, action: { payload: any; type: string }) => {
  const { id, method, data } = action.payload;
  const { list, total } = handleState(
    state,
    cloneDeep({ id, ...data, error: false }),
    method
  );
  return { ...state, list, total };
};

const setError = (state: any, action: { payload: any }) => {
  const { data } = action.payload;
  return { ...state, error: data };
};

export const recommendSlice = createSlice({
  name: "recommend",
  initialState: recommend,
  reducers: {
    [actions.CLEAR_LIST]: clearList,
    [actions.SET_LIST]: setList,
    [actions.CUD_LIST]: actionList,
    [actions.CLEAR_CURRENT]: clearCurrent,
    [actions.SET_CURRENT]: setCurrent,
    [actions.CUD_CURRENT]: actionCurrent,
    [actions.SET_ERROR]: setError,
  },
});

// Action creators are generated for each case reducer function
export const RecommendActions = recommendSlice.actions;

export default recommendSlice.reducer; // EXPORT Slice reducer
