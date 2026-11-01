import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const CATEGORY_CARD_CONTAINER_BASE_CLASS =
  "flex flex-col gap-3 rounded-2xl border bg-surface-container p-4 md:flex-row md:flex-wrap md:items-center md:gap-3";

export const CATEGORY_CARD_CONTAINER_BORDER_CLASS =
  "border-outline-variant";

export const CATEGORY_CARD_CONTAINER_BORDER_CONFIRM_DELETE_CLASS =
  "border-error";

export const CATEGORY_CARD_CONTAINER_INACTIVE_CLASS =
  "opacity-70";

export const resolveCategoryCardContainerClassName = (
  isInactive: boolean,
  isConfirmingDelete: boolean
): string =>
  joinClassNames(
    CATEGORY_CARD_CONTAINER_BASE_CLASS,
    isConfirmingDelete
      ? CATEGORY_CARD_CONTAINER_BORDER_CONFIRM_DELETE_CLASS
      : CATEGORY_CARD_CONTAINER_BORDER_CLASS,
    isInactive && CATEGORY_CARD_CONTAINER_INACTIVE_CLASS
  );

export const CATEGORY_CARD_NAME_ROW_CLASS =
  "flex items-start justify-between gap-3 md:contents";

export const CATEGORY_CARD_NAME_CLASS =
  "line-clamp-2 text-title-md font-medium text-on-surface md:order-1";

export const CATEGORY_CARD_MICRO_LABEL_CLASS =
  "font-mono text-label-mono uppercase text-on-surface-variant";

export const CATEGORY_CARD_TRACKING_MODE_CLASS = `${CATEGORY_CARD_MICRO_LABEL_CLASS} md:order-2`;

export const CATEGORY_CARD_GROUP_ROW_CLASS =
  "text-sm text-on-surface-variant md:order-3";

export const CATEGORY_CARD_GROUP_PREFIX_CLASS =
  CATEGORY_CARD_MICRO_LABEL_CLASS;

export const CATEGORY_CARD_STATUS_PILL_CLASS = `${CATEGORY_CARD_MICRO_LABEL_CLASS} rounded-full border border-outline px-2 py-0.5 md:order-4 md:ml-auto`;
