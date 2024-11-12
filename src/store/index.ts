import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./reducers/apps";
import recommendSlice from "./reducers/recommends";

const store = configureStore({
  reducer: {
    app: appSlice,
    recommend: recommendSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
