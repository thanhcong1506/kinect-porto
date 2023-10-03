import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { getSession } from "next-auth/react";
import { useApi } from "./apiSlice";
// import { fetchLovedGames } from "./gameLovedSlice";
import { toast } from "react-toastify";

interface GamesState {
  allGames: Games[];
  newGames: Games[];
  popularGames: Games[];
  lovedGames: Game[];
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
const useGetApiHeader = async () => {
  const session = await getSession();

  const apiToken = useApi(session?.user.access_token);
  return apiToken;
};

export const fetchGamesAsync = createAsyncThunk(
  "games/fetchGames",
  async (_, thunkApi) => {
    const apiClient = await useGetApiHeader();
    const { data } = await apiClient.get<Games[]>("/games?limit=10&page=1", {
      signal: thunkApi.signal,
    });
    const { rows } = data as unknown as { rows: Games[] };
    return rows;
  }
);
export const fetchNewGamesAsync = createAsyncThunk(
  "games/fetchNewGames",
  async (_, thunkApi) => {
    const apiClient = await useGetApiHeader();
    const { data } = await apiClient.get<Games[]>(
      "/games/newest?limit=10&page=1",
      { signal: thunkApi.signal }
    );

    const { rows } = data as unknown as { rows: Games[] };
    return rows;
  }
);
export const fetchPopularGamesAsync = createAsyncThunk(
  "games/fetchPopularGames",
  async (_, thunkApi) => {
    const apiClient = await useGetApiHeader();
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
  async () => {
    const apiClient = await useGetApiHeader();
    const { data } = await apiClient.get<Game[]>(
      "/games/loved?limit=10&page=1"
    );
    const { rows } = data as unknown as { rows: Game[] };
    return rows;
  }
);

// Tạo action async add removeFromFavorite
export const toggleLovedGame = createAsyncThunk(
  "games/toggleLovedGame",
  async (gameId: number | undefined) => {
    const apiClient = await useGetApiHeader();
    const response = await apiClient.post<boolean>("games/love", {
      game_id: gameId,
    });
    const isLove = response.data; // Giá trị boolean trả về từ API

    return { gameId, isLove };
  }
);

export const removeLovedGame = createAsyncThunk(
  "games/removeLovedGame",
  async (gameId: number | undefined, thunkAPI) => {
    const apiClient = await useGetApiHeader();
    const response = await apiClient.post<boolean>("games/love", {
      game_id: gameId,
    });
    const isRemoved = response.data;
    return { gameId, isRemoved };
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
        state.lovedGames = action.payload;
        state.status = "succeeded";
      })
      .addCase(toggleLovedGame.fulfilled, (state, action) => {
        const { gameId, isLove } = action.payload;
        if (isLove) {
          toast.success("Add to your love games");
          const index = state.lovedGames.findIndex(
            (game) => game.id === gameId
          );

          if (index !== -1) {
            const findObjectWithId = state.lovedGames[index];
            state.lovedGames.push(findObjectWithId);
          }
        } else {
          state.lovedGames = state.lovedGames.filter(
            (game) => game.id !== gameId
          );
          toast.error("Remove your love games");
        }
      })
      .addCase(removeLovedGame.fulfilled, (state, action) => {
        const { gameId, isRemoved } = action.payload;
        if (isRemoved) {
          state.lovedGames = state.lovedGames.filter(
            (game) => game.id !== gameId
          );
        }
      });
  },
});
export const selectAllGames = (state: RootState) => state.games.allGames;
export const selectNewGames = (state: RootState) => state.games.newGames;
export const selectPopularGames = (state: RootState) =>
  state.games.popularGames;
const gamesReducer = gamesSlice.reducer;
export default gamesReducer;
