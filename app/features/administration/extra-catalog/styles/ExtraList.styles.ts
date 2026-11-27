import {
  BUTTON_BASE_CLASS,
  BUTTON_ENABLED_CLASS,
  BUTTON_SIZE_CLASS,
  BUTTON_VARIANT_CLASS,
} from "@/app/components/button/styles/Button.styles";
import { BUTTON, SIZE } from "@/app/constants";

export const EXTRA_LIST_CONTENT_CLASS =
  "mx-auto flex w-full max-w-3xl flex-col gap-5 px-margin-mobile py-md md:px-margin-desktop md:py-lg";

export const EXTRA_LIST_CARDS_CLASS = "flex flex-col gap-3";

export const EXTRA_LIST_HEADER_CLASS =
  "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between";

export const EXTRA_LIST_HEADER_TITLE_CLASS =
  "min-w-0 text-headline-lg-mobile font-bold tracking-tight text-on-surface md:text-headline-lg";

export const EXTRA_LIST_HEADING_CLASS =
  "flex min-w-0 flex-col gap-1";

export const EXTRA_LIST_SUBTITLE_CLASS =
  "text-base text-on-surface-variant";

export const EXTRA_LIST_CREATE_ICON_CLASS = "text-xl";

export const EXTRA_LIST_CREATE_LINK_CLASS = `${BUTTON_BASE_CLASS} ${BUTTON_VARIANT_CLASS[BUTTON.PRIMARY]} ${BUTTON_SIZE_CLASS[SIZE.FULL]} ${BUTTON_ENABLED_CLASS} min-h-12 gap-2 rounded-xl sm:w-auto sm:shrink-0`;
