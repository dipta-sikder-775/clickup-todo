import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todoSliceReducer from "./features/todo/slice";
import { ITodoInitialState } from "./features/todo/types";

const persistConfig: PersistConfig<ITodoInitialState> = {
  key: "root",
  storage,
};

const persistedTodoReducer = persistReducer(persistConfig, todoSliceReducer);

const rootReducer = combineReducers({
  todoSlice: persistedTodoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
