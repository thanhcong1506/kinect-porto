type User = {
  id: number;
  email: string;
  password: string;
};

type Games = {
  image_url: string;
  download_url: string;
  isLoved?: boolean;
  id: number;
  name: string;
  description?: string;
  genres?: [
    {
      id: number;
      name: string;
    }
  ];
};

interface GameDetail {
  image_url: string;
  download_url: string;
  isLoved?: boolean;
  id: number;
  name: string;
  description: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  game_screenshots: string[] | [];
}
interface Game {
  image_url: string;
  isLoved?: boolean;
  id: number;
  name: string;
}
interface GameFavorite {
  myGame: Game[];
}

interface ActionTypes {
  addToCartFavorite: (item: Game) => void;
  removeFromCartFavorite: (item: Game) => void;
}
