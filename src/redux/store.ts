import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import gamesReducer from "./gameSlice";
import genreReducer from "./genreSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    games: gamesReducer,
    genre: genreReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
