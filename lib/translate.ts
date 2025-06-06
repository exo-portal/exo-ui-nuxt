import type { TxKeyPath } from "~/i18n/i18n";

export const translate = (
  key: number,
  options?: Record<string, string | number>
) => {
  const { t } = useI18n();
  return key ? t(key, options ?? {}) : "";
};

const test: TxKeyPath = "welcome";
