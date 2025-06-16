const rolePrefixes: UserMainRole[] = ["admin", "hr", "project-team"];

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();

  // Wait for user state to be hydrated
  if (!auth.hydrated) return;

  const userRole = auth.currentUserRole;

  if (to.meta.requireAuth && auth.isLoggedIn) {
    // Only check for /internal/ routes
    if (to.path.startsWith("/internal/")) {
      const [, , routeRole, ...rest] = to.path.split("/");

      if (
        rolePrefixes.includes(routeRole as UserMainRole) &&
        routeRole !== userRole
      ) {
        const newPath = ["/internal", userRole, ...rest].join("/");
        return navigateTo(newPath);
      }
    }
  }
});
