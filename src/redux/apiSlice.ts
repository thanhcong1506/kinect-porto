import { getSession } from "next-auth/react";

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

export const useGetApiHeader = async () => {
  const session = await getSession();
  const apiToken = useApi(session?.user.access_token);
  return apiToken;
};
