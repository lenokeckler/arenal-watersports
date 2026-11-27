export const UNIT_PHOTOS_PAGE_CLASS =
  "mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-6";

export const UNIT_PHOTOS_HEADING_CLASS =
  "text-headline-lg-mobile text-on-surface md:text-headline-lg";

export const UNIT_PHOTOS_MESSAGE_CLASS =
  "rounded-xl border border-outline-variant/60 bg-surface-container/80 px-4 py-3 text-body-base text-on-surface shadow-sm backdrop-blur";

export const UNIT_PHOTOS_UNIT_ROW_CLASS =
  "flex items-center justify-between gap-3";

export const UNIT_PHOTOS_UNIT_CLASS =
  "text-title-md font-semibold text-on-surface";

export const UNIT_PHOTOS_IMPACTS_CLASS =
  "text-body-base text-on-surface-variant";

export const UNIT_PHOTOS_LIST_CLASS =
  "w-full [&_li]:flex [&_ul]:grid [&_ul]:list-none [&_ul]:grid-cols-2 [&_ul]:gap-3 sm:[&_ul]:grid-cols-3";

export const UNIT_PHOTO_CLASS =
  "flex w-full flex-col gap-2 rounded-xl border border-outline-variant/60 bg-surface-container/80 p-3 shadow-sm backdrop-blur";

export const UNIT_PHOTO_ANGLE_CLASS =
  "min-h-12 text-body-base leading-6 font-semibold text-on-surface sm:min-h-0";

export const UNIT_PHOTO_FRAME_CLASS =
  "relative flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-lg bg-surface-container-high";

export const UNIT_PHOTO_IMAGE_CLASS = "object-cover";

export const UNIT_PHOTO_EMPTY_CLASS =
  "text-body-base text-on-surface-variant";

export const UNIT_PHOTO_PICK_TILE_CLASS =
  "absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-outline-variant px-2 text-center text-body-base font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary";

export const UNIT_PHOTO_PICK_ICON_CLASS = "text-3xl!";

export const UNIT_PHOTO_REPLACE_CLASS =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 text-body-base font-semibold text-on-primary hover:brightness-110 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary flex-1";

export const UNIT_PHOTO_LARGE_ACTIONS_CLASS =
  "mt-3 flex items-stretch gap-2";

export const UNIT_PHOTO_INPUT_CLASS = "sr-only";

export const UNIT_PHOTO_OPEN_CLASS =
  "absolute inset-0 block cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary";

export const UNIT_PHOTO_LARGE_FRAME_CLASS =
  "relative aspect-4/3 w-full overflow-hidden rounded-lg bg-surface-container-high";

export const UNIT_PHOTO_LARGE_IMAGE_CLASS =
  "object-contain";

export const UNIT_PHOTOS_ACTIONS_CLASS =
  "grid grid-cols-2 gap-3";

export const UNIT_PHOTOS_ACTION_CLASS =
  "inline-flex min-h-12 items-center justify-center rounded-xl border border-outline-variant bg-surface-container/80 px-3 text-center text-on-surface transition-colors hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const resolveUnitPhotoPickerClass = (
  hasPhoto: boolean
): string =>
  hasPhoto
    ? UNIT_PHOTO_REPLACE_CLASS
    : UNIT_PHOTO_PICK_TILE_CLASS;

export const UNIT_PHOTO_DELETE_CLASS =
  "inline-flex min-h-12 w-14 shrink-0 items-center justify-center rounded-xl border border-error/70 text-error hover:bg-error/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const UNIT_PHOTO_CONFIRM_TEXT_CLASS =
  "text-body-base text-on-surface";

export const UNIT_PHOTO_CONFIRM_ACTIONS_CLASS =
  "mt-4 grid grid-cols-2 gap-3";

export const UNIT_PHOTO_CONFIRM_CANCEL_CLASS =
  "min-h-12 rounded-xl border border-outline-variant text-body-base font-semibold text-on-surface hover:bg-on-surface/10 disabled:opacity-60";

export const UNIT_PHOTO_CONFIRM_DELETE_CLASS =
  "min-h-12 rounded-xl bg-error text-body-base font-semibold text-on-error hover:brightness-110 disabled:opacity-60";
