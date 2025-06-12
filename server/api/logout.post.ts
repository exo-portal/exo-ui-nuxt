export default defineEventHandler(async (event) => {
  const backendUrl = process.env.NUXT_BASE_URL;
  if (!backendUrl) {
    return { success: false, error: "BACKEND_URL not set" };
  }

  // Call your backend Spring API to logout
  await $fetch(`${backendUrl}/api/auth/authentication/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // if you need to send cookies
  });

  return { success: true };
});