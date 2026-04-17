import axios from "axios";

import { destroySession, getSession } from "../session";
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

export default apiClient;
