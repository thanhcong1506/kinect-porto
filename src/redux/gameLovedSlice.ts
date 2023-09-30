import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { useApi } from "./apiSlice";
import { getSession } from "next-auth/react";
import axios from "axios";
import { fetchNewGamesAsync } from "./gameSlice";

interface FavoriteState {
  lovedGames: Game[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FavoriteState = {
  lovedGames: [],
  status: "idle",
  error: null,
};

const getApiHeader = async () => {
  const session = await getSession();
  const apiToken = useApi(session?.user.access_token);
  return apiToken;
};

export const fetchLovedGames = createAsyncThunk(
  "game/fetchLovedGames",
  async () => {
    const apiClient = await getApiHeader();
    const { data } = await apiClient.get<Game[]>(
      "/games/loved?limit=10&page=1"
    );
    const { rows } = data as unknown as { rows: Game[] };
    return rows;
  }
);
// Tạo action async add removeFromFavorite
export const toggleLovedGame = createAsyncThunk(
  "game/toggleLovedGame",
  async (gameId: number, { dispatch }) => {
    const apiClient = await getApiHeader();
    const response = await apiClient.post<boolean>("games/love", {
      game_id: gameId,
    });
    const isLove = response.data; // Giá trị boolean trả về từ API
    dispatch(fetchNewGamesAsync);
    return { gameId, isLove };
  }
);

export const removeLovedGame = createAsyncThunk(
  "game/removeLovedGame",
  async (gameId: number, thunkAPI) => {
    const apiClient = await getApiHeader();
    const response = await apiClient.post<boolean>("games/love", {
      game_id: gameId,
    });
    const isRemoved = response.data;
    return { gameId, isRemoved };
  }
);

const lovedGameSlice = createSlice({
  name: "lovedGame",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLovedGames.fulfilled, (state, action) => {
        state.lovedGames = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchLovedGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLovedGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(toggleLovedGame.fulfilled, (state, action) => {
        const { gameId, isLove } = action.payload;
        if (isLove) {
          state.lovedGames.push({
            id: gameId,
            image_url: "",
            name: "",
          });
        } else {
          state.lovedGames = state.lovedGames.filter(
            (game) => game.id !== gameId
          );
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

export default lovedGameSlice.reducer;

export const selectFavorites = (state: RootState) => state.lovedGame;
