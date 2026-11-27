import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const CATEGORY_CONFIGURE_SECTION_CLASS =
  "overflow-hidden rounded-xl border border-outline-variant bg-surface-container/60";

export const CATEGORY_CONFIGURE_SECTION_HEADING_CLASS =
  "m-0 text-base";

export const CATEGORY_CONFIGURE_SECTION_HEADER_CLASS =
  "flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary";

export const CATEGORY_CONFIGURE_SECTION_TEXT_CLASS =
  "flex min-w-0 flex-1 flex-col gap-1";

export const CATEGORY_CONFIGURE_SECTION_TITLE_CLASS =
  "text-body-base font-semibold text-on-surface";

export const CATEGORY_CONFIGURE_SECTION_SUMMARY_CLASS =
  "text-sm text-on-surface-variant";

export const CATEGORY_CONFIGURE_SECTION_CHEVRON_BASE_CLASS =
  "shrink-0 text-on-surface-variant transition-transform motion-reduce:transition-none";

export const CATEGORY_CONFIGURE_SECTION_CHEVRON_OPEN_CLASS =
  "rotate-180";

export const resolveCategoryConfigureSectionChevronClassName =
  (isOpen: boolean): string =>
    joinClassNames(
      CATEGORY_CONFIGURE_SECTION_CHEVRON_BASE_CLASS,
      isOpen &&
        CATEGORY_CONFIGURE_SECTION_CHEVRON_OPEN_CLASS
    );

export const CATEGORY_CONFIGURE_SECTION_PANEL_CLASS =
  "flex flex-col gap-3 border-t border-outline-variant p-4 empty:hidden";
