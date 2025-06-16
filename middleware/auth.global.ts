import { verifySession } from "~/composables/index";
import { PATH } from "~/config";
import type {
  ApiResponse,
  ApiResultModel,
  AuthenticationResponse,
} from "~/types/types";

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  if (to.meta.requireAuth) {
    if (!auth.isLoggedIn) {
      try {
        const result: ApiResponse<ApiResultModel<AuthenticationResponse>> =
          await verifySession();
        if (
          result &&
          result.data &&
          result.data.resultData &&
          result.data.isSuccess
        ) {
          auth.setIsLoggedIn(true);
          auth.setIsTokenValid(true);
          auth.setUser(result.data.resultData.user);
        } else {
          auth.setIsLoggedIn(false);
          auth.setIsTokenValid(false);
          return navigateTo(PATH.SIGNIN.path);
        }
      } catch (error: unknown) {
        auth.setIsLoggedIn(false);
        auth.setIsTokenValid(false);
        return navigateTo(PATH.SIGNIN.path);
      }
    }
  }

  if (process.server) return;
});
