export const UNORDERED_LIST = {
  VARIANTS: {
    VALIDATION: "validation",
    DEFAULT: "default",
    PLANS: "plans",
    SIDE_MENU: "side-menu",
  },
} as const;
export type UnorderedListVariant =
  (typeof UNORDERED_LIST.VARIANTS)[keyof typeof UNORDERED_LIST.VARIANTS];
