import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const SYSTEM_NAVIGATION_CLASS =
  "fixed inset-x-0 bottom-0 z-40 border-t border-outline bg-surface-container/95 pb-[env(safe-area-inset-bottom)] text-on-surface shadow-lg backdrop-blur md:inset-x-auto md:inset-y-0 md:left-0 md:flex md:w-64 md:flex-col md:border-r md:border-t-0 md:pb-0";
export const SYSTEM_NAVIGATION_LIST_CLASS =
  "mx-auto flex w-full max-w-screen-lg items-stretch md:mx-0 md:max-w-none md:flex-1 md:flex-col md:items-stretch md:justify-start md:gap-1 md:p-3";
export const SYSTEM_NAVIGATION_ITEM_CLASS =
  "flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2 text-center text-label-mono uppercase text-on-surface-variant transition-colors hover:text-primary md:min-h-12 md:flex-none md:flex-row md:justify-start md:gap-3 md:rounded-lg md:px-4 md:text-left focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none";
export const SYSTEM_NAVIGATION_ACTIVE_CLASS =
  "text-primary";
export const SYSTEM_NAVIGATION_ICON_CLASS =
  "text-headline-md";
export const SYSTEM_NAVIGATION_LABEL_CLASS =
  "break-words text-center text-label-mono leading-tight max-sm:text-xs max-sm:tracking-normal";
export const SYSTEM_NAVIGATION_MENU_CLASS =
  "fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] flex-col overflow-y-auto border-r border-outline-variant bg-surface-container shadow-xl";

export const SYSTEM_NAVIGATION_MENU_BACKDROP_CLASS =
  "fixed inset-0 z-40 bg-black/60";

export const SYSTEM_NAVIGATION_MENU_HEADER_CLASS =
  "flex items-center justify-between gap-3 border-b border-outline-variant py-3 pl-5 pr-2";

export const SYSTEM_NAVIGATION_MENU_TITLE_CLASS =
  "text-title-md font-bold text-on-surface";

export const SYSTEM_NAVIGATION_MENU_CLOSE_CLASS =
  "flex min-h-12 min-w-12 items-center justify-center rounded-xl text-on-surface hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-primary";

export const SYSTEM_NAVIGATION_MENU_BODY_CLASS =
  "flex flex-1 flex-col gap-6 px-4 pb-6 pt-5";

export const SYSTEM_NAVIGATION_MENU_IDENTITY_CLASS =
  "flex items-center gap-3";

export const SYSTEM_NAVIGATION_MENU_AVATAR_CLASS =
  "flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-base font-bold text-primary";

export const SYSTEM_NAVIGATION_MENU_IDENTITY_TEXT_CLASS =
  "flex min-w-0 flex-col";

export const SYSTEM_NAVIGATION_MENU_IDENTITY_NAME_CLASS =
  "truncate text-lg font-bold text-on-surface";

export const SYSTEM_NAVIGATION_MENU_IDENTITY_META_CLASS =
  "text-sm text-on-surface-variant";

export const SYSTEM_NAVIGATION_MENU_SECTION_CLASS =
  "flex flex-col gap-1.5";

export const SYSTEM_NAVIGATION_MENU_SECTION_LABEL_CLASS =
  "px-3 text-sm font-bold uppercase tracking-wider text-on-surface-variant";

export const SYSTEM_NAVIGATION_MENU_HIDDEN_CLASS =
  "!hidden";

const SYSTEM_NAVIGATION_MENU_LINK_CLASS =
  "group flex min-h-13 items-center gap-3.5 rounded-xl px-3 text-lg font-bold transition-colors focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none";

const SYSTEM_NAVIGATION_MENU_LINK_IDLE_CLASS =
  "text-on-surface hover:bg-surface-container-high";

const SYSTEM_NAVIGATION_MENU_LINK_CURRENT_CLASS =
  "bg-primary/15 text-primary";

export const SYSTEM_NAVIGATION_MENU_LINK_ICON_CLASS =
  "shrink-0 text-2xl";

export const SYSTEM_NAVIGATION_MENU_LINK_LABEL_CLASS =
  "min-w-0 flex-1 truncate";

export const SYSTEM_NAVIGATION_MENU_LINK_CHEVRON_CLASS =
  "shrink-0 text-on-surface-variant group-aria-[current=page]:text-primary";

export const resolveSystemNavigationMenuLinkClassName = (
  isCurrent: boolean
): string =>
  joinClassNames(
    SYSTEM_NAVIGATION_MENU_LINK_CLASS,
    isCurrent
      ? SYSTEM_NAVIGATION_MENU_LINK_CURRENT_CLASS
      : SYSTEM_NAVIGATION_MENU_LINK_IDLE_CLASS
  );

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
