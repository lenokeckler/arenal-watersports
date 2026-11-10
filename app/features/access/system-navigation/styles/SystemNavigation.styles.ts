import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const SYSTEM_NAVIGATION_CLASS =
  "fixed inset-x-0 bottom-0 z-40 border-t border-outline bg-surface-container/95 pb-[env(safe-area-inset-bottom)] text-on-surface shadow-lg backdrop-blur";
export const SYSTEM_NAVIGATION_LIST_CLASS =
  "mx-auto flex w-full max-w-screen-lg items-stretch";
export const SYSTEM_NAVIGATION_ITEM_CLASS =
  "flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2 text-center text-label-mono uppercase text-on-surface-variant transition-colors hover:text-primary focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none";
export const SYSTEM_NAVIGATION_ACTIVE_CLASS =
  "text-primary";
export const SYSTEM_NAVIGATION_ICON_CLASS =
  "text-headline-md";
export const SYSTEM_NAVIGATION_LABEL_CLASS =
  "break-words text-center text-label-mono leading-tight max-sm:text-xs max-sm:tracking-normal";
export const SYSTEM_NAVIGATION_MENU_CLASS =
  "absolute bottom-full right-2 mb-2 flex min-w-48 flex-col rounded-xl border border-outline bg-surface-container p-2 shadow-xl";
export const SYSTEM_NAVIGATION_MENU_HIDDEN_CLASS =
  "!hidden";
export const SYSTEM_NAVIGATION_MENU_LINK_CLASS =
  "flex min-h-12 items-center rounded-lg px-3 text-body-base text-on-surface hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-primary";
export const resolveSystemNavigationItemClassName = (
  isCurrent: boolean
): string =>
  joinClassNames(
    SYSTEM_NAVIGATION_ITEM_CLASS,
    isCurrent && SYSTEM_NAVIGATION_ACTIVE_CLASS
  );

export const resolveSystemNavigationMenuClassName = (
  isOpen: boolean
): string =>
  joinClassNames(
    SYSTEM_NAVIGATION_MENU_CLASS,
    !isOpen && SYSTEM_NAVIGATION_MENU_HIDDEN_CLASS
  );
