import axios from "axios";

import { env } from "@/lib/env.client";
import { destroySession, getSession } from "../session";

const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
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

export default apiClient;
