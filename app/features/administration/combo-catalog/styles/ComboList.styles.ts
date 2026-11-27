import {
  BUTTON_BASE_CLASS,
  BUTTON_ENABLED_CLASS,
  BUTTON_SIZE_CLASS,
  BUTTON_VARIANT_CLASS,
} from "@/app/components/button/styles/Button.styles";
import { BUTTON, SIZE } from "@/app/constants";

export const COMBO_LIST_CONTENT_CLASS =
  "mx-auto flex w-full max-w-3xl flex-col gap-5 px-margin-mobile py-md md:px-margin-desktop md:py-lg";

export const COMBO_LIST_HEADER_CLASS =
  "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between";

export const COMBO_LIST_HEADING_CLASS =
  "flex min-w-0 flex-col gap-1";

export const COMBO_LIST_SUBTITLE_CLASS =
  "text-base text-on-surface-variant";

export const COMBO_LIST_CREATE_LINK_CLASS = `${BUTTON_BASE_CLASS} ${BUTTON_VARIANT_CLASS[BUTTON.PRIMARY]} ${BUTTON_SIZE_CLASS[SIZE.FULL]} ${BUTTON_ENABLED_CLASS} min-h-12 gap-2 rounded-xl sm:w-auto sm:shrink-0`;

export const COMBO_LIST_CREATE_ICON_CLASS = "text-xl";

export const COMBO_LIST_TITLE_CLASS =
  "min-w-0 text-headline-lg-mobile font-bold tracking-tight text-on-surface md:text-headline-lg";

export const COMBO_LIST_SECTION_CLASS =
  "flex flex-col gap-3";

export const COMBO_LIST_SECTION_HEADER_CLASS =
  "flex items-baseline justify-between gap-2.5 pt-2";

export const COMBO_LIST_SECTION_TITLE_CLASS =
  "min-w-0 text-lg font-bold text-on-surface";

export const COMBO_LIST_SECTION_NOTE_CLASS =
  "shrink-0 text-sm text-on-surface-variant";

export const COMBO_LIST_CARDS_CLASS = "flex flex-col gap-3";

export const COMBO_LIST_EMPTY_CLASS =
  "rounded-xl border-2 border-dashed border-outline-variant px-4 py-5 text-center text-base text-on-surface-variant";

export const COMBO_LIST_ERROR_WRAPPER_CLASS =
  "flex flex-col items-center gap-3 py-12 text-center";

export const COMBO_LIST_ERROR_BODY_CLASS =
  "text-body-base text-error";

export const COMBO_LIST_BUTTON_CLASS = "min-h-11";
