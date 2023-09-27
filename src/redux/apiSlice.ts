"use client";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://user-api.dev.grailfarmer.app/api/v1",
});

export const useApi = (token: string | undefined) => {
  apiClient.interceptors.request.use((config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  return apiClient;
};

// export const fetchGames = async (url: string): Promise<Game[]> => {
//   const response = await apiClient.get(url);
//   return response.data;
// };

// export const addLoveGame = (gameId: number): Promise<void> => {
//   return apiClient.post("/games/love", { gameId });
// };

// export const removeLoveGame = (gameId: number): Promise<void> => {
//   return apiClient.delete("/games/love", { data: { gameId } });
// };

// export const fetchNewGames = (): Promise<Game[]> => {
//   return fetchGames("/games/newest?limit=10&page=1");
// };

// export const fetchPopularGames = (): Promise<Game[]> => {
//   return fetchGames("/games/popular");
// };
