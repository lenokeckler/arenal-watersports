import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const TARIFF_LIST_CONTENT_CLASS =
  "mx-auto flex w-full max-w-3xl flex-col gap-4 px-margin-mobile py-md md:px-margin-desktop md:py-lg";

export const TARIFF_LIST_HEADER_CLASS =
  "flex flex-col gap-1";

export const TARIFF_LIST_TITLE_CLASS =
  "min-w-0 text-headline-lg-mobile font-bold tracking-tight text-on-surface md:text-headline-lg";

export const TARIFF_LIST_SUBTITLE_CLASS =
  "text-base text-on-surface-variant";

export const TARIFF_LIST_FILTERS_CLASS =
  "flex flex-wrap gap-2 empty:hidden";

const TARIFF_LIST_FILTER_CLASS =
  "inline-flex min-h-11 items-center rounded-full border-2 px-3.5 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none";

const TARIFF_LIST_FILTER_IDLE_CLASS =
  "border-outline-variant text-on-surface hover:bg-surface-container-high";

const TARIFF_LIST_FILTER_SELECTED_CLASS =
  "border-primary bg-primary/15 text-primary";

export const resolveTariffListFilterClassName = (
  isSelected: boolean
): string =>
  joinClassNames(
    TARIFF_LIST_FILTER_CLASS,
    isSelected
      ? TARIFF_LIST_FILTER_SELECTED_CLASS
      : TARIFF_LIST_FILTER_IDLE_CLASS
  );

export const TARIFF_LIST_CARDS_CLASS =
  "flex flex-col gap-3";

export const TARIFF_LIST_EMPTY_CLASS =
  "rounded-xl border-2 border-dashed border-outline-variant px-4 py-5 text-center text-base text-on-surface-variant";

export const TARIFF_LIST_ERROR_WRAPPER_CLASS =
  "flex flex-col items-center gap-3 py-12 text-center";

export const TARIFF_LIST_ERROR_BODY_CLASS =
  "text-body-base text-error";

export const TARIFF_LIST_BUTTON_CLASS = "min-h-11";
