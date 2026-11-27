import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import type { CardGridSize } from "@/app/utils/card-grid/models/CardGridSize.type";

export const UNIT_PHOTO_LIST_CLASS =
  "mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-6 lg:max-w-5xl";

export const UNIT_PHOTO_LIST_HEADING_CLASS =
  "text-headline-lg-mobile text-on-surface md:text-headline-lg";

export const UNIT_PHOTO_LIST_MESSAGE_CLASS =
  "rounded-xl border border-outline-variant/60 bg-surface-container/80 px-4 py-3 text-body-base text-on-surface";

export const UNIT_PHOTO_LIST_GRID_CLASS =
  "grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center";

const UNIT_PHOTO_LIST_CARD_BASE_CLASS =
  "flex min-w-0 flex-col overflow-hidden rounded-xl border border-outline-variant/60 bg-surface-container/80 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const UNIT_PHOTO_LIST_CARD_SIZE_CLASSES: Record<
  CardGridSize,
  string
> = {
  pair: "sm:w-[calc((100%-0.75rem)/2)] sm:max-w-[24rem]",
  trio: "sm:w-[calc((100%-1.5rem)/3)]",
  standard:
    "sm:w-[calc((100%-1.5rem)/3)] lg:w-[calc((100%-2.25rem)/4)]",
};

export const resolveUnitPhotoListCardClass = (
  size: CardGridSize
): string =>
  joinClassNames(
    UNIT_PHOTO_LIST_CARD_BASE_CLASS,
    UNIT_PHOTO_LIST_CARD_SIZE_CLASSES[size]
  );

export const UNIT_PHOTO_LIST_FRAME_CLASS =
  "relative flex aspect-4/3 w-full items-center justify-center bg-surface-container-high text-on-surface-variant";

export const UNIT_PHOTO_LIST_IMAGE_CLASS = "object-cover";

export const UNIT_PHOTO_LIST_BODY_CLASS =
  "flex flex-col gap-1 p-3";

export const UNIT_PHOTO_LIST_ROW_CLASS =
  "flex flex-wrap items-center justify-between gap-x-2";

export const UNIT_PHOTO_LIST_CODE_CLASS =
  "min-w-0 wrap-anywhere text-title-md font-semibold text-on-surface";

export const UNIT_PHOTO_LIST_DETAIL_CLASS =
  "text-body-sm text-on-surface-variant";

export const UNIT_PHOTO_LIST_METER_CLASS =
  "h-1.5 w-full appearance-none overflow-hidden rounded-full bg-surface-container-highest accent-primary [&::-moz-progress-bar]:bg-primary [&::-webkit-progress-bar]:bg-surface-container-highest [&::-webkit-progress-value]:bg-primary";
