import { defineStore } from "pinia";
import type { AccessLevelRole, UserInterface } from "~/types/types";

export type UserMainRole = "admin" | "hr" | "management" | "project-team" | "guest";

interface AuthState {
  user: UserInterface | null;
  isLoggedIn: boolean;
  isTokenValid: boolean;
  currentUserRole: UserMainRole | null;
  hydrated: boolean;
  roleNames?: string[];
  featureKeys?: string[];
  accessLevelRole: AccessLevelRole | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    currentUserRole: null,
    roleNames: [],
    isLoggedIn: false,
    isTokenValid: false,
    hydrated: false,
    accessLevelRole: null,
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
    setRoleNames(roleNames: string[]) {
      this.roleNames = roleNames;
    },
    setFeatureKeys(featureKeys: string[]) {
      this.featureKeys = featureKeys;
    },
    setAccessLevelRole(accessLevelRole: AccessLevelRole) {
      this.accessLevelRole = accessLevelRole;
    },
    reset() {
      this.user = null;
      this.currentUserRole = null;
      this.roleNames = [];
      this.isLoggedIn = false;
      this.isTokenValid = false;
      this.hydrated = false;
      this.featureKeys = undefined;
      this.accessLevelRole = null;
    }
  },
  persist: {
    afterRestore: (ctx: { store: AuthState }) => {
      ctx.store.hydrated = true;
    },
  } as any, // Enable persistence
});
