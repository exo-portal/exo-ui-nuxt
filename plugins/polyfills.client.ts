// Polyfills for client-side only
export default defineNuxtPlugin(() => {
  // Ensure FormData is available globally
  if (typeof globalThis !== 'undefined' && !globalThis.FormData) {
    globalThis.FormData = window.FormData;
  }
});
