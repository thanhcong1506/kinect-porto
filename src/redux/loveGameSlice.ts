import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { useApi } from "./apiSlice";
import { getSession } from "next-auth/react";

interface FavoriteState {
  games: Record<number, boolean>; // Lưu trữ danh sách game yêu thích theo ID và trạng thái
}

const initialState: FavoriteState = {
  games: {},
};

const getApiHeader = async () => {
  const session = await getSession();
  const apiToken = useApi(session?.user.access_token);
  return apiToken;
};

export const toggleFavorite = createAsyncThunk(
  "favorites/toggleFavorite",
  async (gameId: number, { rejectWithValue }) => {
    const apiClient = await getApiHeader();
    try {
      const response = await apiClient.post(`/games/love`, { game_id: gameId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleFavorite.fulfilled, (state, action) => {
      const gameId = action.meta.arg;
      const isFavorite = action.payload;
      state.games[gameId] = isFavorite;
    });
  },
});

export default favoritesSlice.reducer;

export const selectFavorites = (state: RootState) => state.favorites.games;
