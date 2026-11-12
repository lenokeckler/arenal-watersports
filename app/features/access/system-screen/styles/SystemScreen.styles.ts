import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const SYSTEM_SCREEN_BASE_CLASS =
  "flex min-h-dvh flex-col";
export const SYSTEM_SCREEN_CONTENT_CLEARANCE_CLASS =
  "pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0 md:pl-64";
export const resolveSystemScreenClassName = (
  shouldAddNavigationClearance: boolean
): string =>
  joinClassNames(
    SYSTEM_SCREEN_BASE_CLASS,
    shouldAddNavigationClearance &&
      SYSTEM_SCREEN_CONTENT_CLEARANCE_CLASS
  );
