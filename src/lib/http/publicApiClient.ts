import axios from "axios";
import { env } from "@/lib/env.client";

const publicApiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  // withCredentials: true,
});

export default publicApiClient;
