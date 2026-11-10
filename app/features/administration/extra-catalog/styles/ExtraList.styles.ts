import {
  BUTTON_BASE_CLASS,
  BUTTON_ENABLED_CLASS,
  BUTTON_SIZE_CLASS,
  BUTTON_VARIANT_CLASS,
} from "@/app/components/button/styles/Button.styles";
import { BUTTON, SIZE } from "@/app/constants";

export const EXTRA_LIST_CONTENT_CLASS =
  "mx-auto flex w-full max-w-3xl flex-col gap-gutter px-margin-mobile py-md md:px-margin-desktop md:py-lg";

export const EXTRA_LIST_CARDS_CLASS = "flex flex-col gap-3";

export const EXTRA_LIST_HEADER_CLASS =
  "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between";

export const EXTRA_LIST_HEADER_TITLE_CLASS =
  "min-w-0 text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg";

export const EXTRA_LIST_CREATE_LINK_CLASS = `${BUTTON_BASE_CLASS} ${BUTTON_VARIANT_CLASS[BUTTON.PRIMARY]} ${BUTTON_SIZE_CLASS[SIZE.MD]} ${BUTTON_ENABLED_CLASS} rounded-md min-h-11 sm:shrink-0`;
