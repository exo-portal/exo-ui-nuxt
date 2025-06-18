export function useCustomAppConfig() {
  const config = useRuntimeConfig();
  return {
    BASE_URL: config.public.baseUrl || "http://localhost:8080",
    GITHUB_OAUTH_URL: config.public.githubOauthUrl || "",
    GOOGLE_OAUTH_URL: config.public.googleOauthUrl || "",
    GITHUB_OAUTH_FULL_URL:
      (config.public.baseUrl || "http://localhost:8080") +
      (config.public.githubOauthUrl || ""),
    GOOGLE_OAUTH_FULL_URL:
      (config.public.baseUrl || "http://localhost:8080") +
      (config.public.googleOauthUrl || ""),
    DEV_MODE: config.public.devMode || "development",
  };
}
