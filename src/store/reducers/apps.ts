import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep, get } from "lodash";

import { APP_ACTIONS as actions } from "../actions";
import { defaultPagination, initialState } from "../initialState";
import { handleState } from "../utils";
import { DataType } from "@/components/RecommendAppCards/interface";

const { app } = initialState;
const clearCurrent = (state: any) => ({ ...state, current: {}, error: false });
const clearList = (state: any) => ({
  ...state,
  list: [],
  error: false,
  ...defaultPagination,
});

const setList = (state: any, action: { payload: any; type: string }) => {
  const data = (action.payload || []).map((item: DataType) => ({
    ...item,
    id: get(item, "id.attributes.im:id", ""),
  }));
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
  const { method, data } = action.payload;
  const { list, total } = handleState(state, cloneDeep(data), method);
  console.log(list, data);
  return { ...state, list, total, error: false };
};

const setError = (state: any, action: { payload: any }) => {
  const { data } = action.payload;
  return { ...state, error: data };
};

export const appSlice = createSlice({
  name: "app",
  initialState: app,
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
export const AppActions = appSlice.actions;

export default appSlice.reducer; // EXPORT Slice reducer
