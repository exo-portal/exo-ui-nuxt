import { logoutUser } from "~/composables/useAuthenticationApi";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const backendUrl = config.public.baseUrl;
  if (!backendUrl) {
    return { success: false, error: "NUXT_BASE_URL not set" };
  }

  try {
    await logoutUser();
    return { success: true };
  } catch (error) {
    console.error("Error during logout:", error);
    return {
      success: false,
      error: "Failed to logout. Please try again later.",
    };
  }
});
