export const ARIA_CURRENT = {
  PAGE: "page",
} as const;

export type AriaCurrentValue =
  (typeof ARIA_CURRENT)[keyof typeof ARIA_CURRENT];
