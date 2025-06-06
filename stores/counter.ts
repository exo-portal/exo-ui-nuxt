import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: (): { count: number } => ({
    count: 0,
  }),
  actions: {
    increment(): void {
      this.count++;
      if (process.client) {
        localStorage.setItem("counter.count", String(this.count));
      }
    },
    setCount(value: number): void {
      this.count = value;
      if (process.client) {
        localStorage.setItem("counter.count", String(this.count));
      }
    },
    loadCount(): void {
      if (process.client) {
        const stored = localStorage.getItem("counter.count");
        if (stored !== null) {
          this.count = Number(stored);
        }
      }
    },
  },
});
