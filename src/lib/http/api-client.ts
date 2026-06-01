import axios from "axios";

import {
  destroySession,
  getSession,
  updateTokens,
} from "../../features/auth/utils/session";
import { env } from "@/lib/env";

const apiClient = axios.create({
  baseURL: env.BACKEND_URL,
  // withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});
// 401 then logout
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await destroySession();
    }
    return Promise.reject(error);
  },
);
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 hole ar retry flag na thakle
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // infinite loop band korte

      try {
        const session = await getSession();
        if (!session?.refreshToken) {
          await destroySession();
          return Promise.reject(error);
        }

        // backend e refresh token pathao
        const { data } = await axios.post(
          `${env.BACKEND_URL}/get-access-token/`,
          { refresh: session.refreshToken },
        );

        // session update koro new tokens diye
        await updateTokens({
          accessToken: data.access,
          refreshToken: data.refresh ?? session.refreshToken,
        });

        // original request e new token set kore retry
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // refresh o fail korle logout
        await destroySession();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
export default apiClient;
