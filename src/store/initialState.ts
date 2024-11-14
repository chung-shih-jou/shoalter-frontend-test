type DefaultPaginationType = {
  total: number;
  page: number;
  size: number;
  pageCount: number;
};

export type StoreType<T = any> = {
  list: T[];
  current: T;
  error: any;
} & DefaultPaginationType;

export type StroePool<T = any> = {
  [key: string]: StoreType<T>;
};

export const defaultPagination: DefaultPaginationType = {
  total: 0,
  page: 0,
  size: 0,
  pageCount: 0,
};
export const initialState: StroePool = {
  app: {
    list: [],
    ...defaultPagination,
    current: {},
    error: null,
  },
  recommend: {
    list: [],
    ...defaultPagination,
    current: {},
    error: null,
  },
};
