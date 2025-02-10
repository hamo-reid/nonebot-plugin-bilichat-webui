import { defineStore } from "pinia";
import API from "@/api";

let prevBotConfig = {} as any;

export const useGlobalStore = defineStore("global", {
  state: () => ({
    token: "",
    hasToken: true,
    isGetConfigSchema: false,
    botConfig: {} as any,
    schema: {} as any,
    isSaving: false,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      window.localStorage.setItem("bilichatToken", token);
    },
    getToken() {
      this.token = window.localStorage.getItem("bilichatToken") || "";
      this.hasToken = !!this.token;
    },
    removeToken() {
      this.token = "";
      window.localStorage.removeItem("token");
    },
    async recoverConfig() {
      this.botConfig = prevBotConfig;
    }
  }
})

export const useConfigStore = defineStore("config", {
  state: () => ({
    isGetConfigSchema: false,  // 是否已经获取过配置项的schema
    config: {},  // 当前配置项
    configSchema: {},  // 配置项的schema
    prevConfig: {},  // 上一次保存的配置项
  }),
  actions: {
    tempUpdateConfig(config: any) {
      this.config = config;
    },
    async getConfigSchema() {
      const globalStore = useGlobalStore();
      const { status, data} = await API.getConfigSchema();
      if (status === 200) {
        delete data.$defs.UP.properties.dynamic.additionalProperties;
        delete data.$defs.UP.properties.dynamic.propertyNames;
        this.configSchema = data;
        globalStore.hasToken = true;
        this.isGetConfigSchema = true;
        window.$message.success("获取配置数据成功");
      } else if (status === 403 || status === 401) {
        window.$message.error("Token验证失败");
        globalStore.removeToken();
        globalStore.hasToken = false;
      } else {
        window.$message.error("获取配置数据失败");
      }
    },

    async getBotConfig() {
      const globalStore = useGlobalStore();
      const { status, data} = await API.getConfig();
      if (status === 200) {
        this.config = data;
        prevBotConfig = data;
        globalStore.hasToken = true;
      } else if (status === 403 || status === 401) {
        window.$message.error("Token验证失败");
        globalStore.removeToken();
        globalStore.hasToken = false;
      } else {
        window.$message.error("获取配置数据失败");
      }
    },

    async saveBotConfig(config: object) {
      const globalStore = useGlobalStore();
      const { status, data} = await API.saveConfig(config);
      if (status === 200) {
        this.config = data;
        prevBotConfig = data;
        globalStore.hasToken = true;
      } else if (status === 403 || status === 401) {
        window.$message.error("Token验证失败");
        globalStore.removeToken();
        globalStore.hasToken = false;
      }
    },
  }
});