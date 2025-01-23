import { defineStore } from "pinia";
import API from "@/api"

export const useGlobalStore = defineStore("global", {
  state: () => ({
    token: "",
    hasToken: true,
    isGetConfigSchema: false,
    schema: {} as any,
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
    async getConfigSchema() {
      const { status, data} = await API.getConfigSchema();
      if (status === 200) {
        this.schema = data;
        this.hasToken = true;
        this.isGetConfigSchema = true;
      } else if (status === 403 || status === 401) {
        window.$message.error("Token验证失败");
        this.removeToken();
        this.hasToken = false;
      } else {
        window.$message.error("获取配置数据失败");
      }
    }
  }
})
