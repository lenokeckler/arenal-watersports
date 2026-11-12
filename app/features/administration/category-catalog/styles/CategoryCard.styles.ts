import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const CATEGORY_CARD_CONTAINER_BASE_CLASS =
  "flex flex-col gap-3 rounded-xl border bg-surface-container/60 p-4";

export const CATEGORY_CARD_CONTAINER_BORDER_CLASS =
  "border-outline-variant";

export const CATEGORY_CARD_CONTAINER_BORDER_CONFIRM_DELETE_CLASS =
  "border-error";

export const resolveCategoryCardContainerClassName = (
  isConfirmingDelete: boolean
): string =>
  joinClassNames(
    CATEGORY_CARD_CONTAINER_BASE_CLASS,
    isConfirmingDelete
      ? CATEGORY_CARD_CONTAINER_BORDER_CONFIRM_DELETE_CLASS
      : CATEGORY_CARD_CONTAINER_BORDER_CLASS
  );

export const CATEGORY_CARD_ROW_CLASS =
  "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 md:flex md:gap-3";

export const CATEGORY_CARD_SUMMARY_CLASS =
  "contents md:flex md:min-w-0 md:flex-1 md:flex-col md:gap-1";

export const CATEGORY_CARD_INACTIVE_TEXT_CLASS =
  "opacity-70";

export const CATEGORY_CARD_ACTIONS_ROW_CLASS =
  "contents md:ml-auto md:flex md:items-center md:gap-3";

export const CATEGORY_CARD_NAME_BASE_CLASS =
  "col-start-1 row-start-1 min-w-0 truncate text-title-md font-medium text-on-surface md:line-clamp-2 md:whitespace-normal md:break-words";

export const resolveCategoryCardNameClassName = (
  isInactive: boolean
): string =>
  joinClassNames(
    CATEGORY_CARD_NAME_BASE_CLASS,
    isInactive && CATEGORY_CARD_INACTIVE_TEXT_CLASS
  );

export const CATEGORY_CARD_SUBTITLE_BASE_CLASS =
  "col-start-1 row-start-2 min-w-0 text-body-base text-on-surface-variant";

export const resolveCategoryCardSubtitleClassName = (
  isInactive: boolean
): string =>
  joinClassNames(
    CATEGORY_CARD_SUBTITLE_BASE_CLASS,
    isInactive && CATEGORY_CARD_INACTIVE_TEXT_CLASS
  );

export const CATEGORY_CARD_MICRO_LABEL_CLASS =
  "font-mono text-label-mono uppercase text-on-surface-variant";

export const CATEGORY_CARD_GROUP_ROW_CLASS =
  "col-span-2 row-start-3 text-sm text-on-surface-variant";

export const CATEGORY_CARD_GROUP_PREFIX_CLASS =
  CATEGORY_CARD_MICRO_LABEL_CLASS;
