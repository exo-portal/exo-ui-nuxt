import { useIdle } from "@vueuse/core";
import { watch } from "vue";
import { useRouter } from "vue-router";
import { DEFAULT_IDLE_TIMEOUT, PATH } from "~/config";

export default defineNuxtRouteMiddleware((to) => {
  // Only run on client
  if (process.server) return;

  // Check if the route requires authentication
  if (to.meta.requireAuth) {
    // Prevent multiple watchers
    if (!(window as any).__idleWatcherSet) {
      const { idle } = useIdle(DEFAULT_IDLE_TIMEOUT * 60 * 1000);
      const router = useRouter();
      watch(idle, async (isIdle) => {
        if (isIdle) {
          try {
            await $fetch("/api/logout", { method: "POST" });
          } catch (e) {
            // Optionally handle error

            console.error("Logout failed:", e); // Optionally handle error
          } finally {
            document.cookie.split(";").forEach((cookie) => {
              const cookieName = cookie.split("=")[0].trim();
              document.cookie = `${cookieName}=;expires=${new Date(
                0
              ).toUTCString()};path=/`;
              // Attempt to clear cookies with specific domain attributes
              const domainParts = window.location.hostname.split(".");
              while (domainParts.length > 0) {
                const domain = domainParts.join(".");
                document.cookie = `${cookieName}=;expires=${new Date(
                  0
                ).toUTCString()};path=/;domain=${domain}`;
                domainParts.shift();
              }
            });
            if (window.sessionStorage) window.sessionStorage.clear();
            if (window.localStorage) window.localStorage.clear();
          }
          router.push(PATH.SIGNIN.path);
        }
      });
      (window as any).__idleWatcherSet = true;
    }
  }
});
