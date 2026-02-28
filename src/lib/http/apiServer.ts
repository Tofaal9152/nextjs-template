"use server";
import { env } from "@/lib/env.server";

import axios from "axios";
import { destroySession, getSession } from "../session";

const apiServer = axios.create({
  baseURL: env.BACKEND_URL,
  // withCredentials: true,
});

apiServer.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// 401 then logout
apiServer.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await destroySession();
    }
    return Promise.reject(error);
  }
);

export default apiServer;
