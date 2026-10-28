export const STORE_SLICES = {
  LANGUAGE: "language",
  TOAST: "toast",
} as const;

export type StoreSliceName =
  (typeof STORE_SLICES)[keyof typeof STORE_SLICES];
