import type { TxKeyPath } from "~/i18n/i18n";

/**
 * Translates text using Nuxt i18n (vue-i18n).
 *
 * @param key The i18n key.
 * @param options The options object containing dynamic values.
 */
export const translate = (
  key: TxKeyPath,
  options?: Record<string, string | number>
) => {
  const { t } = useI18n();
  return key ? t(key, options ?? {}) : "";
};
