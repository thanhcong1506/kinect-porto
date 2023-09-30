import { configureStore, combineReducers } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import gamesReducer from "./gameSlice";
// import favoritesReducer from "./loveGameSlice";
import loveGameReducer from "./gameLovedSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    games: gamesReducer,

    lovedGame: loveGameReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
