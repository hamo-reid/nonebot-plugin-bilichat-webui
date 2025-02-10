import { defineStore } from "pinia";
import { shallowRef } from "vue";
import API from "@/api";

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
    }
  }
})

export const useConfigStore = defineStore("config", {
  state: () => ({
    isGetConfigSchema: false,  // 是否已经获取过配置项的schema
    config: {},  // 当前配置项
    configSchema: {},  // 配置项的schema
    prevConfig: {},  // 上一次保存的配置项,
    isSaving: false,  // 是否正在保存配置项
  }),
  actions: {
    tempUpdateConfig(config: any) {
      this.config = config;
    },
    rollbackConfig() {
      window.$message.info("已经重置到上一次保存的配置")
      this.config = this.prevConfig;
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
        this.prevConfig = shallowRef(data);
        globalStore.hasToken = true;
      } else if (status === 403 || status === 401) {
        window.$message.error("Token验证失败");
        globalStore.removeToken();
        globalStore.hasToken = false;
      } else {
        window.$message.error("获取配置数据失败");
      }
    },

    async saveBotConfig() {
      if (this.isSaving) return;
      const msgReactive = window.$message.loading('保存中...', { duration: 0 });
      const globalStore = useGlobalStore();
      const { status, data} = await API.saveConfig(this.config);
      if (status === 200) {
        msgReactive.type = 'success';
        msgReactive.content = '保存成功';
        setTimeout(() => {
          msgReactive.destroy();
        }, 2000);
        this.config = data;
        this.prevConfig = shallowRef(data);
        globalStore.hasToken = true;
      } else if (status === 403 || status === 401) {
        window.$message.error("Token验证失败");
        globalStore.removeToken();
        globalStore.hasToken = false;
      }
    },
  }
});