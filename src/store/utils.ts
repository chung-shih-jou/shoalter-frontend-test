import { ApiMethods } from "@/utils/define";
import { ApiMethodTypes } from "@/utils/define.type";
import { StoreType } from "./initialState";

export const createReducer = (
  initialState: any,
  handlers: { [key: string]: Function }
) => {
  return (state = initialState, action: { type: any }) => {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type))
      return handlers[action.type](state, action);
    else return state;
  };
};
export const createReleTotaducer = (
  initialState: any,
  handlers: { [key: string]: Function }
) => {
  return (state = initialState, action: { type: any }) => {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type))
      return handlers[action.type](state, action);
    else return state;
  };
};

export const getDefaultHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

export function getQuery(url: string, params: object) {
  const query = Object.entries(params)
    .reduce((string, [key, value]) => {
      return value ? string + `${key}=${value}&` : string;
    }, "")
    .slice(0, -1);
  return url.includes("?") ? query : "?" + query;
}

export function handleState(
  state: StoreType,
  data: any,
  method: ApiMethodTypes
) {
  const list = handleList(state.list, data, method);
  const total = handleTotal(state.total, data, method);
  return { list, total };
}

export function handleList(list: any[], data: any, method: ApiMethodTypes) {
  switch (method) {
    case ApiMethods.CREATE: {
      list.push(data);
      return list;
    }
    case ApiMethods.BULK_CREATE:
      return list.concat(data);
    case ApiMethods.DELETE:
      return list.filter(({ id }) => id !== data.id);
    case ApiMethods.BULK_DELETE:
      return list.filter(
        ({ id }) => !data.find((d = { id: -1 }) => d.id === id)
      );
    case ApiMethods.UPDATE:
      return list.reduce((arr, listValue) => {
        if (listValue.id === data.id) arr.push({ ...listValue, ...data });
        else arr.push(listValue);
        return arr;
      }, []);
    case ApiMethods.BULK_UPDATE:
      return list.reduce((arr, listValue) => {
        const currentUpdateDate = data.find(
          (d = { id: -1 }) => listValue.id === d.id
        );
        if (currentUpdateDate) arr.push({ ...listValue, ...currentUpdateDate });
        else arr.push(listValue);
        return arr;
      }, []);
  }
}

export function handleTotal(total: number, data: any, method: ApiMethodTypes) {
  switch (method) {
    case ApiMethods.CREATE:
      return total + 1;
    case ApiMethods.BULK_CREATE:
      return total + data.length;
    case ApiMethods.DELETE:
      return total > 0 ? total - 1 : 0;
    case ApiMethods.BULK_DELETE:
      return total - data.length > 0 ? total - data.length : 0;
    case ApiMethods.UPDATE:
    case ApiMethods.BULK_UPDATE:
      return total;
  }
}
