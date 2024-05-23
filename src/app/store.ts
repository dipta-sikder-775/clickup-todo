import { configureStore } from "@reduxjs/toolkit";
import todoSliceReducer from "./features/todo/todoSlice";
// ...

export const store = configureStore({
  reducer: {
    todoSlice: todoSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
