import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const SYSTEM_SCREEN_BASE_CLASS =
  "flex min-h-dvh flex-col";
export const SYSTEM_SCREEN_CONTENT_CLEARANCE_CLASS =
  "pb-[calc(4rem+env(safe-area-inset-bottom))]";
export const SYSTEM_SCREEN_CLASS = joinClassNames(
  SYSTEM_SCREEN_BASE_CLASS,
  SYSTEM_SCREEN_CONTENT_CLEARANCE_CLASS
);
