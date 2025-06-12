import { useIdle } from "@vueuse/core";
import { watch } from "vue";
import { useRouter } from "vue-router";
import { PATH } from "~/config";

export default defineNuxtRouteMiddleware((to) => {
  //   // Only run on client
  if (process.server) return;

  // Check if the route requires authentication
  if (to.meta.requireAuth) {
    // Prevent multiple watchers
    if (!(window as any).__idleWatcherSet) {
      const { idle } = useIdle(10 * 1000);
      const router = useRouter();
      watch(idle, async (isIdle) => {
        if (isIdle) {
          try {
            await $fetch("/api/logout", { method: "POST" });
          } catch (e) {
            // Optionally handle error
            console.error("Logout failed:", e); // Optionally handle error
          }
          router.push(PATH.SIGNIN.path);
        }
      });
      (window as any).__idleWatcherSet = true;
    }
  }
});
