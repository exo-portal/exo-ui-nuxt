import { defineStore } from "pinia";

export type UserMainRole = "admin" | "hr" | "project-team" | "guest";

interface AuthState {
  user: any;
  isLoggedIn: boolean;
  isTokenValid: boolean;
  currentUserRole: UserMainRole | null;
  hydrated: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    currentUserRole: null,
    isLoggedIn: false,
    isTokenValid: false,
    hydrated: false,
  }),
  actions: {
    setCurrentUserRole(role: UserMainRole | null) {
      this.currentUserRole = role;
    },
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
