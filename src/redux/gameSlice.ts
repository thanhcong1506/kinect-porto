import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import { getSession } from "next-auth/react";
import { useApi } from "./apiSlice";

interface GamesState {
  allGames: Games[];
  newGames: Games[];
  popularGames: Games[];
  lovedGames: Games[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GamesState = {
  allGames: [],
  newGames: [],
  popularGames: [],
  lovedGames: [],
  status: "idle",
  error: null,
};
const getApiHeader = async () => {
  const session = await getSession();
  const apiToken = useApi(session?.user.access_token);
  return apiToken;
};

export const fetchGamesAsync = createAsyncThunk(
  "games/fetchGames",
  async (_, thunkApi) => {
    const apiClient = await getApiHeader();
    const response = await apiClient.get<Games[]>("/games?limit=10&page=1", {
      signal: thunkApi.signal,
    });
    const { rows } = response.data as unknown as { rows: Games[] };

    return rows;
  }
);
export const fetchNewGamesAsync = createAsyncThunk(
  "games/fetchNewGames",
  async (_, thunkApi) => {
    const apiClient = await getApiHeader();
    const response = await apiClient.get<Games[]>(
      "/games/newest?limit=10&page=1",
      { signal: thunkApi.signal }
    );

    const { rows } = response.data as unknown as { rows: Games[] };
    return rows;
  }
);
export const fetchPopularGamesAsync = createAsyncThunk(
  "games/fetchPopularGames",
  async (_, thunkApi) => {
    const apiClient = await getApiHeader();
    const { data } = await apiClient.get<Games[]>(
      "/games/newest?limit=10&page=1",
      { signal: thunkApi.signal }
    );
    const { rows } = data as unknown as { rows: Games[] };
    return rows;
  }
);
export const fetchLovedGamesAsync = createAsyncThunk(
  "games/fetchLovedGames",
  async (_, thunkApi) => {
    const apiClient = await getApiHeader();
    const { data } = await apiClient.get<Games[]>(
      "/games/loved?limit=10&page=1",
      {
        signal: thunkApi.signal,
      }
    );
    const { rows } = data as unknown as { rows: Games[] };
    return rows;
  }
);

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchGamesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGamesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allGames = action.payload;
      })
      .addCase(fetchGamesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchNewGamesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newGames = action.payload;
      })
      .addCase(fetchNewGamesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewGamesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchPopularGamesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularGames = action.payload;
      })
      .addCase(fetchPopularGamesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularGamesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })

      .addCase(fetchLovedGamesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lovedGames = action.payload;
      })
      .addCase(fetchLovedGamesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLovedGamesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});
export const selectAllGames = (state: RootState) => state.games.allGames;
export const selectNewGames = (state: RootState) => state.games.newGames;
export const selectPopularGames = (state: RootState) =>
  state.games.popularGames;
export const selectLovedGames = (state: RootState) => state.games.lovedGames;
export default gamesSlice.reducer;
