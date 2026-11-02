import { BUTTON, SIZE } from "@/app/constants";
import {
  BUTTON_BASE_CLASS,
  BUTTON_ENABLED_CLASS,
  BUTTON_SIZE_CLASS,
  BUTTON_VARIANT_CLASS,
} from "@/app/components/button/styles/Button.styles";

export const CATEGORY_LIST_HEADER_CLASS =
  "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between";

export const CATEGORY_LIST_HEADER_TEXT_CLASS =
  "flex min-w-0 flex-col gap-1";

export const CATEGORY_LIST_HEADER_TITLE_CLASS =
  "text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg";

export const CATEGORY_LIST_HEADER_SUBTITLE_CLASS =
  "text-body-base text-on-surface-variant";

export const CATEGORY_LIST_HEADER_CREATE_LINK_CLASS = `${BUTTON_BASE_CLASS} ${BUTTON_VARIANT_CLASS[BUTTON.PRIMARY]} ${BUTTON_SIZE_CLASS[SIZE.MD]} ${BUTTON_ENABLED_CLASS} rounded-md min-h-11 sm:shrink-0`;
