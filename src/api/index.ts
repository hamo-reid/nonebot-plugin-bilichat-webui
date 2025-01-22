import HTTPClient, {
  basicRequestInterceptor,
  basicResponseInterceptor
} from "@/utils/http"

const request = new HTTPClient(
  {
    baseURL: `${window.location.protocol}//${window.location.host}/bilichatwebui`,
    timeout: 10000,
  },
  [basicRequestInterceptor],
  [basicResponseInterceptor]
)

async function getConfigSchema() {
  const res = await request.get("/config/schema")
  if (res.status === 200) {
    return res.data
  } else {
    return null
  }
}

async function getConfig() {
  const res = await request.get("/config")
  if (res.status === 200) {
    return res.data
  } else {
    return null
  }
}

async function saveConfig(config: any) {
  const res = await request.post("/config", config)
  if (res.status === 200) {
    return res.data
  } else {
    return null
  }
}

export default {
  getConfigSchema,
  getConfig,
  saveConfig
}