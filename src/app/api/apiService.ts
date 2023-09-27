import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://user-api.dev.grailfarmer.app/api/v1",
});

export const fetchGames = async (
  limit: number,
  page: number
): Promise<Game[]> => {
  const response = await fetch(`/api/games?limit=${limit}&page=${page}`);
  const data = await response.json();
  return data;
};

export const addLoveGame = async (gameId: number): Promise<void> => {
  await fetch(`/api/games/love`, {
    method: "POST",
    body: JSON.stringify({ gameId }),
  });
};

export const removeLoveGame = async (gameId: number): Promise<void> => {
  await fetch(`/api/games/love`, {
    method: "DELETE",
    body: JSON.stringify({ gameId }),
  });
};

export const fetchNewGames = async (): Promise<Game[]> => {
  const response = await fetch(`/api/games/newest`);
  const data = await response.json();
  return data;
};

export const fetchPopularGames = async (): Promise<Game[]> => {
  const response = await fetch(`/api/games/popular`);
  const data = await response.json();
  return data;
};
