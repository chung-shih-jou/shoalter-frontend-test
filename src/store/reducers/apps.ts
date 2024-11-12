import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep, get } from "lodash";

import { APP_ACTIONS as actions } from "../actions";
import { defaultPagination, initialState } from "../initialState";
import { handleState } from "../utils";
import { DataType } from "@/components/RecommendAppCards/interface";

const { app } = initialState;
const clearCurrent = (state: any) => ({ ...state, current: {} });
const clearList = (state: any) => ({
  ...state,
  list: {},
  ...defaultPagination,
});

const setList = (state: any, action: { payload: any; type: string }) => {
  const data = (action.payload || []).map((item: DataType) => ({
    ...item,
    id: get(item, "id.attributes.im:id", ""),
  }));
  return { ...state, list: data };
};

const setCurrent = (state: any, action: { payload: any; type: string }) => {
  const data = action.payload || {};
  return { ...state, current: data };
};

const actionCurrent = (state: any, action: { payload: any; type: string }) => {
  const data = action.payload || {};
  // do something
  return { ...state, current: data };
};

const actionList = (state: any, action: { payload: any; type: string }) => {
  const { method, data } = action.payload;
  const { list, total } = handleState(state, cloneDeep(data), method);
  console.log(list, data);
  return { ...state, list, total };
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
  },
});

// Action creators are generated for each case reducer function
export const AppActions = appSlice.actions;

export default appSlice.reducer; // EXPORT Slice reducer
