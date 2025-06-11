import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    loading: false,
  }),
  actions: {
    setLoading(value: boolean) {
      this.loading = value;
      if (process.client) {
        localStorage.setItem("loading", String(value));
      }
    },
  },
});
