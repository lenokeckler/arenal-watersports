import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const BOARD_CARD_CLASS =
  "flex w-full min-w-0 flex-col overflow-hidden rounded-xl border border-outline-variant bg-card-tint-neutral-bg shadow-lg backdrop-blur-md";

export const BOARD_CARD_MEDIA_ASPECT_CLASS =
  "aspect-4/5 w-full shrink-0 md:aspect-square lg:aspect-4/3";

export const BOARD_CARD_MEDIA_CLASS = joinClassNames(
  BOARD_CARD_MEDIA_ASPECT_CLASS,
  "relative overflow-hidden bg-surface-container-lowest/60"
);

export const BOARD_CARD_IMAGE_CLASS =
  "absolute inset-0 h-full w-full object-contain px-sm pb-10 pt-14 lg:pb-12 lg:pt-12";

export const BOARD_CARD_PLACEHOLDER_CLASS =
  "absolute inset-0 flex items-center justify-center";

export const BOARD_CARD_PLACEHOLDER_ICON_CLASS =
  "text-6xl text-on-surface-variant/40";

export const BOARD_CARD_CHIPS_CLASS =
  "absolute inset-x-0 top-0 flex flex-wrap items-start gap-xs p-sm";

export const BOARD_CARD_CHIP_CLASS =
  "whitespace-nowrap rounded-full border border-primary/30 bg-background/70 px-2 py-0.5 font-mono text-label-mono uppercase text-primary backdrop-blur-md";

export const BOARD_CARD_FREE_CHIP_CLASS = joinClassNames(
  BOARD_CARD_CHIP_CLASS,
  "ml-auto tabular-nums"
);

export const BOARD_CARD_NAME_CLASS =
  "absolute inset-x-0 bottom-0 bg-linear-to-t from-background/90 via-background/50 to-transparent px-sm pb-sm pt-md";

export const BOARD_CARD_LABEL_CLASS =
  "break-words text-body-base font-semibold text-on-surface md:text-title-md";

export const BOARD_CARD_BODY_CLASS =
  "flex flex-1 flex-col gap-sm p-sm md:p-md";

export const BOARD_CARD_USAGE_CLASS =
  "text-sm text-on-surface-variant";

export const BOARD_CARD_BAR_TRACK_CLASS =
  "block h-2 w-full overflow-hidden rounded-full bg-surface-container-highest";

export const BOARD_CARD_BAR_FILL_CLASS = "fill-primary";

export const BOARD_CARD_LINES_CLASS =
  "flex flex-col gap-sm border-t border-outline-variant pt-sm";

export const BOARD_CARD_LINE_CLASS = "flex flex-col";

export const BOARD_CARD_LINE_NAME_CLASS =
  "break-words text-sm font-semibold text-on-surface";

export const BOARD_CARD_LINE_STATS_CLASS =
  "flex flex-wrap items-baseline gap-x-sm";

export const BOARD_CARD_LINE_FREE_CLASS =
  "text-sm tabular-nums text-primary";
