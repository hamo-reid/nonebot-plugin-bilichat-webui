import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    token: "",
    hasToken: false,
    isGetConfigSchema: false,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      window.localStorage.setItem("token", token);
    },
    getToken() {
      this.token = window.localStorage.getItem("token") || "";
      this.hasToken = !!this.token;
    }
  }
})
