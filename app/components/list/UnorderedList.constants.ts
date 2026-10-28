import type { AriaRole } from "react";
import { ARIA_ROLE } from "@/app/constants";

export const UNORDERED_LIST = {
  VARIANTS: {
    VALIDATION: "validation",
    DEFAULT: "default",
    PLAIN: "plain",
    PLANS: "plans",
    SIDE_MENU: "side-menu",
    CHECKLIST: "checklist",
  },
} as const;
export type UnorderedListVariant =
  (typeof UNORDERED_LIST.VARIANTS)[keyof typeof UNORDERED_LIST.VARIANTS];
export const LIST_ROLE_BY_VARIANT: Partial<
  Record<UnorderedListVariant, AriaRole>
> = {
  [UNORDERED_LIST.VARIANTS.PLAIN]: ARIA_ROLE.LIST,
};
