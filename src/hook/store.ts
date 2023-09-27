import { create } from "zustand";

const INITIAL_STATE = {
  myGame: [],
};

export const useGameStore = create<GameFavorite & ActionTypes>((set, get) => ({
  myGame: INITIAL_STATE.myGame,
  addToCartFavorite(item) {
    set((state) => ({
      myGame: [...state.myGame, item],
    }));
  },

  removeFromCartFavorite(item) {
    set((state) => ({
      myGame: state.myGame.filter((game) => game.id !== item.id),
    }));
  },
}));
