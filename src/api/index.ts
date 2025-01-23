import HTTPClient, {
  basicResponseInterceptor
} from "@/utils/http";
import { type InternalAxiosRequestConfig } from "axios";

import { useGlobalStore } from "@/store";

const tokenRequestInterceptor = {
  success: (config: InternalAxiosRequestConfig) => {
    const globalStore = useGlobalStore();
    if (globalStore.token) {
      config.headers["Authorization"] = `Bearer ${globalStore.token}`;
    }
    return config;
  },
  error: (error: Error ) => {
    return Promise.reject(error);
  }
}

const request = new HTTPClient(
  {
    baseURL: `${window.location.protocol}//${window.location.host}/bilichatwebui`,
    timeout: 10000,
  },
  [tokenRequestInterceptor],
  [basicResponseInterceptor]
);


async function getConfigSchema() {
  const res = await request.get("/config/schema")
  return res
}

async function getConfig() {
  const res = await request.get("/config")
  return res
}

async function saveConfig(config: any) {
  const res = await request.post("/config", config)
  return res
}

export default {
  getConfigSchema,
  getConfig,
  saveConfig
}