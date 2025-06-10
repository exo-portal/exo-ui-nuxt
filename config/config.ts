export const BASE_URL = process.env.NUXT_BASE_URL || 'http://localhost:8080';
const GITHUB_OAUTH_URL = process.env.NUXT_GITHUB_OAUTH_URL || "";
const GOOGLE_OAUTH_URL = process.env.NUXT_GOOGLE_OAUTH_URL || "";
export const GITHUB_OAUTH_FULL_URL = BASE_URL + GITHUB_OAUTH_URL;
export const GOOGLE_OAUTH_FULL_URL = BASE_URL + GOOGLE_OAUTH_URL;
export const DEV_MODE = process.env.NUXT_DEV_MODE || "development";
export const DEFAULT_OTP_LENGTH = 4;
export const DEFAULT_IDLE_TIMEOUT = 15; // minute