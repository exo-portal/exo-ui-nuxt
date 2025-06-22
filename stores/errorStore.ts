import { defineStore } from "pinia";
import type { TxKeyPath } from "~/i18n/i18n";

export type ErrorType = "toast" | "modal" | null;

interface ErrorState {
  errorType: ErrorType;
  errorMessage: TxKeyPath | string;
}

export const useErrorStore = defineStore("error", {
  state: (): ErrorState => ({
    errorType: null,
    errorMessage: "",
  }),
  actions: {
    setError(errorType: ErrorType, errorMessage: TxKeyPath | string) {
      this.errorType = errorType;
      this.errorMessage = errorMessage;
    },
    clearError() {
      this.errorType = null;
      this.errorMessage = "";
    },
  },
});
