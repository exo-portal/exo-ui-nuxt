import EN from "./locales/en.json";

// Recursively get all key paths as dot-separated strings
type RecursiveKeyOf<TObj extends Record<string, unknown>> = {
  [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, unknown>
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & string];

type DefaultLocale = typeof EN;
type TxKeyPath = RecursiveKeyOf<DefaultLocale>;

export type { TxKeyPath };