1. Tạo slice cho trạng thái danh sách yêu thích:

// features/favoritesSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../path/to/store";
import apiClient from "../path/to/apiClient";

interface FavoriteState {
games: number[]; // Lưu trữ danh sách game yêu thích theo ID
}

const initialState: FavoriteState = {
games: [],
};

export const toggleFavorite = createAsyncThunk(
"favorites/toggleFavorite",
async (gameId: number, { rejectWithValue }) => {
try {
const response = await apiClient.post(`/games/love`, { gameId });
return response.data;
} catch (error) {
return rejectWithValue(error.response.data);
}
}
);

const favoritesSlice = createSlice({
name: "favorites",
initialState,
reducers: {},
extraReducers: (builder) => {
builder
.addCase(toggleFavorite.fulfilled, (state, action) => {
state.games = action.payload;
});
},
});

export default favoritesSlice.reducer;

2. Tạo slice cho danh sách trò chơi chung và danh sách trò chơi mới:

// features/gamesSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "path/to/store";
import { Games } from "../models/games"; // Thay thế bằng đường dẫn đến models/games của bạn
import apiClient from "../api"; // Thay thế bằng API client của bạn

interface GamesState {
allGames: Games[];
newGames: Games[];
status: "idle" | "loading" | "succeeded" | "failed";
error: string | null;
}

const initialState: GamesState = {
allGames: [],
newGames: [],
status: "idle",
error: null,
};

// Action creator để lấy dữ liệu danh sách game từ API
export const fetchGames = createAsyncThunk(
"games/fetchGames",
async (\_, { rejectWithValue }) => {
try {
const response = await apiClient.get<Games[]>("/games?limit=10&page=1");
return response.data;
} catch (error) {
return rejectWithValue(error.response.data);
}
}
);

// Action creator để lấy dữ liệu danh sách game mới từ API
export const fetchNewGames = createAsyncThunk(
"games/fetchNewGames",
async (\_, { rejectWithValue }) => {
try {
const response = await apiClient.get<Games[]>("/games/newest");
return response.data;
} catch (error) {
return rejectWithValue(error.response.data);
}
}
);

const gamesSlice = createSlice({
name: "games",
initialState,
reducers: {},
extraReducers: (builder) => {
builder
.addCase(fetchGames.pending, (state) => {
state.status = "loading";
})
.addCase(fetchGames.fulfilled, (state, action) => {
state.status = "succeeded";
state.allGames = action.payload;
})
.addCase(fetchGames.rejected, (state, action) => {
state.status = "failed";
state.error = action.error.message || null;
})
.addCase(fetchNewGames.pending, (state) => {
state.status = "loading";
})
.addCase(fetchNewGames.fulfilled, (state, action) => {
state.status = "succeeded";
state.newGames = action.payload;
})
.addCase(fetchNewGames.rejected, (state, action) => {
state.status = "failed";
state.error = action.error.message || null;
});
},
});

export const selectAllGames = (state: RootState) => state.games.allGames;
export const selectNewGames = (state: RootState) => state.games.newGames;

export default gamesSlice.reducer;

3. Tạo một <Provider> sử dụng Redux wrapper trong \_app.tsx:

// pages/\_app.tsx
import { Provider } from "react-redux";
import { store } from "../path/to/store";

function MyApp({ Component, pageProps }) {
return (
<Provider store={store}>
<Component {...pageProps} />
</Provider>
);
}

export default MyApp;

4. Tạo các component con (AllGames, NewGames, PopularGames) và sử dụng Redux Toolkit để lấy dữ liệu và trạng thái từ Redux Store:

// components/AllGames.tsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames, selectAllGames } from "../path/to/gamesSlice";
import { addFavorite, removeFavorite } from "../path/to/favoritesSlice";

function AllGames() {
const dispatch = useDispatch();
const allGames = useSelector(selectAllGames);

useEffect(() => {
dispatch(fetchGames());
}, [dispatch]);

const handleAddToFavorites = (gameId: number) => {
dispatch(addFavorite(gameId));
};

const handleRemoveFromFavorites = (gameId: number) => {
dispatch(removeFavorite(gameId));
};

return (
<div>
<h2>All Games</h2>
{allGames.map((game) => (
<div key={game.id}>
<span>{game.name}</span>
{game.isFavorite ? (
<button onClick={() => handleRemoveFromFavorites(game.id)}>
Remove from Favorites
</button>
) : (
<button onClick={() => handleAddToFavorites(game.id)}>
Add to Favorites
</button>
)}
</div>
))}
</div>
);
}

export default AllGames;

// components/PopularGames.tsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPopularGames } from "../path/to/gamesSlice";
import { addFavorite, removeFavorite } from "../path/to/favoritesSlice";

function PopularGames() {
const popularGames = useSelector(selectPopularGames);

useEffect(() => {
// Gọi action để lấy dữ liệu popular games từ API
// dispatch(fetchPopularGames());
}, []);

const handleAddToFavorites = (gameId: number) => {
// Gọi action để thêm game vào danh sách yêu thích
// dispatch(addFavorite(gameId));
};

const handleRemoveFromFavorites = (gameId: number) => {
// Gọi action để xóa game khỏi danh sách yêu thích
// dispatch(removeFavorite(gameId));
};

return (
<div>
<h2>Popular Games</h2>
{/_ Hiển thị danh sách popular games _/}
{popularGames.map((game) => (
<div key={game.id}>
<span>{game.name}</span>
{game.isFavorite ? (
<button onClick={() => handleRemoveFromFavorites(game.id)}>
Remove from Favorites
</button>
) : (
<button onClick={() => handleAddToFavorites(game.id)}>
Add to Favorites
</button>
)}
</div>
))}
</div>
);
}

export default PopularGames;
