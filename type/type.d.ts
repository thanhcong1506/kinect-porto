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

type GameDetail = {
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
};
type Game = {
  image_url: string;
  isLoved?: boolean;
  id: number;
  name: string;
};
type GameLoved = {
  myGame: Game[];
};

type Genre = {
  id: number;
  name: string;
  icon: string;
};

type Category = {
  id: number;
  name: string;
  icon: string;
  isLove?: boolean;
};
