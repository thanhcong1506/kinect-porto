import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface GenreState {
  genre: Genre[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GenreState = {
  genre: [],
  status: "idle",
  error: null,
};

export const fetchGenres = createAsyncThunk("genre/fetchGenres", async () => {
  try {
    const response = await axios.get(
      "https://user-api.dev.grailfarmer.app/api/v1/games/genre?limit=10&page=1"
    );
    const data = await response.data;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch genres.");
  }
});

const genreSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.genre = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});
const genreReducer = genreSlice.reducer;
export default genreReducer;
