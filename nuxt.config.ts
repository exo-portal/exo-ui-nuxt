import tailwindcss from "@tailwindcss/vite";
import { default as vitePlugin } from "unplugin-tailwindcss-mangle/vite";
import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_BASE_URL,
      githubOauthUrl: process.env.NUXT_GITHUB_OAUTH_URL,
      googleOauthUrl: process.env.NUXT_GOOGLE_OAUTH_URL,
      devMode: process.env.NUXT_DEV_MODE,
    },
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [
      tailwindcss(),
      svgLoader(),
      ...(process.env.NUXT_DEV_MODE === "production" ? [vitePlugin()] : []),
    ],
    define: {
      global: "globalThis",
    },
    resolve: {
      alias: {
        'form-data': 'unenv/runtime/mock/empty'
      }
    },
    optimizeDeps: {
      include: ["axios"],
      exclude: ["form-data"]
    },
    ssr: {
      noExternal: ['axios'],
      external: ['form-data']
    }
  },
  nitro: {
    experimental: {
      wasm: true,
    },
    rollupConfig: {
      external: ['form-data']
    },
    alias: {
      'form-data': 'unenv/runtime/mock/empty'
    }
  },
  ssr: true,
  modules: ["shadcn-nuxt", "@nuxtjs/i18n", "@pinia/nuxt", "@nuxt/image"],
  i18n: {
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "fr", name: "Français", file: "fr.json" },
      { code: "tl", name: "Tagalog", file: "tl.json" },
      { code: "ja", name: "日本語", file: "ja.json" },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "locales/",
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
