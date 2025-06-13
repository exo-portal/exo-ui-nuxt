import { defineStore } from "pinia";

interface AuthState {
  user: any;
  isLoggedIn: boolean;
  isTokenValid: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    isLoggedIn: false,
    isTokenValid: false,
  }),
  actions: {
    setUser(user: any) {
      this.user = user;
    },
    setIsLoggedIn(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn;
    },
    setIsTokenValid(isTokenValid: boolean) {
      this.isTokenValid = isTokenValid;
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;
      this.isTokenValid = false;
    },
  },
  persist: true, // Enable persistence
});
