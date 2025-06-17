import { verifySession } from "~/composables/index";
import { PATH, ROLE_MAP } from "~/config";
import type {
  AccessLevelRole,
  ApiResponse,
  ApiResultModel,
  AuthenticationResponse,
} from "~/types/types";

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  // Handle the case where the user is not logged in and tries to access a protected route
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
          const userRole: AccessLevelRole =
            result.data.resultData.accessLevelRole;
          const currentUserRole: UserMainRole = ROLE_MAP[userRole] || "guest";

          auth.setIsLoggedIn(true);
          auth.setIsTokenValid(true);
          auth.setCurrentUserRole(currentUserRole);
          auth.setUser(result.data.resultData.user);
        } else {
          auth.setIsLoggedIn(false);
          auth.setIsTokenValid(false);
          auth.setCurrentUserRole("guest");
          return navigateTo(PATH.SIGNIN.path);
        }
      } catch (error: unknown) {
        auth.setIsLoggedIn(false);
        auth.setIsTokenValid(false);
        auth.setCurrentUserRole("guest");
        return navigateTo(PATH.SIGNIN.path);
      }
    }
  }

  // Handle the case where the user is logged in and tries to access a public route
  if (to.meta.guestOnly && auth.isLoggedIn) {
    try {
      const result: ApiResponse<ApiResultModel<AuthenticationResponse>> =
        await verifySession();
      if (
        result &&
        result.data &&
        result.data.resultData &&
        result.data.isSuccess
      ) {
        const userRole: AccessLevelRole =
          result.data.resultData.accessLevelRole;
        const currentUserRole: UserMainRole = ROLE_MAP[userRole] || "guest";

        auth.setIsLoggedIn(true);
        auth.setIsTokenValid(true);
        auth.setCurrentUserRole(currentUserRole);
        auth.setUser(result.data.resultData.user);

        let path;
        switch (userRole) {
          case "ROLE_ADMIN":
          case "ROLE_SUPER_ADMIN":
            path = PATH.ADMIN_HOME.path;
            break;
          case "ROLE_FINANCE":
          case "ROLE_HR":
            path = PATH.HR_HOME.path;
            break;
          case "ROLE_CLIENT":
            path = PATH.CLIENT_HOME.path;
            break;
          case "ROLE_MANAGER":
          case "ROLE_PROJECT_LEAD":
          case "ROLE_TEAM_LEAD":
          case "ROLE_TECH_LEAD":
          case "ROLE_SENIOR_EMPLOYEE":
          case "ROLE_MID_LEVEL_EMPLOYEE":
          case "ROLE_JUNIOR_EMPLOYEE":
          case "ROLE_ENTRY_LEVEL_EMPLOYEE":
          case "ROLE_INTERN":
            path = PATH.PROJECT_TEAM_HOME.path;
            break;
          case "ROLE_GUEST":
          case "ROLE_APPLICANT":
            path = PATH.APPLICANT_HOME.path;
            break;
          default:
            path = PATH.PROJECT_TEAM_HOME.path;
            break;
        }

        return navigateTo(path);
      }
    } catch (error: unknown) {
      return;
    }
  }

  if (process.server) return;
});
