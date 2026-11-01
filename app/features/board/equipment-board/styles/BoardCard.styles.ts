import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const BOARD_CARD_CLASS =
  "flex w-full min-w-0 flex-col overflow-hidden rounded-xl border border-outline-variant bg-card-tint-neutral-bg shadow-lg backdrop-blur-md";

export const BOARD_CARD_MEDIA_ASPECT_CLASS =
  "aspect-square w-full shrink-0 grow";

export const BOARD_CARD_MEDIA_CLASS = joinClassNames(
  BOARD_CARD_MEDIA_ASPECT_CLASS,
  "relative overflow-hidden"
);

export const BOARD_CARD_IMAGE_CLASS =
  "absolute inset-0 h-full w-full object-cover";

export const BOARD_CARD_PLACEHOLDER_CLASS =
  "absolute inset-0 flex items-center justify-center bg-surface-container-high";

export const BOARD_CARD_PLACEHOLDER_ICON_CLASS =
  "text-6xl text-on-surface-variant/40";

export const BOARD_CARD_CHIPS_CLASS =
  "absolute inset-x-0 top-0 flex items-start justify-between gap-1 p-2 md:gap-xs md:p-sm";

export const BOARD_CARD_CHIP_CLASS =
  "whitespace-nowrap rounded-full border border-primary/30 bg-background/70 px-1.5 py-0.5 font-mono text-label-mono tracking-normal uppercase text-primary backdrop-blur-md";

export const BOARD_CARD_UNIT_CHIP_CLASS = joinClassNames(
  BOARD_CARD_CHIP_CLASS,
  "min-w-0 truncate md:px-2"
);

export const BOARD_CARD_UNIT_CHIP_SHORT_CLASS = "md:hidden";

export const BOARD_CARD_UNIT_CHIP_LONG_CLASS =
  "hidden md:inline";

export const BOARD_CARD_FREE_CHIP_CLASS = joinClassNames(
  BOARD_CARD_CHIP_CLASS,
  "shrink-0 tabular-nums md:px-2"
);

export const BOARD_CARD_NAME_CLASS =
  "absolute inset-x-0 bottom-0 flex flex-col gap-xs bg-linear-to-t from-background/95 via-background/60 to-transparent px-sm pb-sm pt-lg md:gap-sm";

export const BOARD_CARD_LABEL_CLASS =
  "break-words text-body-base font-semibold text-on-surface md:text-title-md";

export const BOARD_CARD_BAR_TRACK_CLASS =
  "block h-2 w-full shrink-0 overflow-hidden rounded-full bg-on-surface/25";

export const BOARD_CARD_BAR_FILL_CLASS = "fill-primary";

export const BOARD_CARD_SLOT_CLASS =
  "relative flex grow flex-col";

export const BOARD_CARD_TOGGLE_CLASS =
  "absolute inset-0 h-full w-full items-end justify-end pb-9 pr-2 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary md:pr-sm";

export const BOARD_CARD_CHEVRON_CLASS =
  "flex size-8 items-center justify-center rounded-full border border-primary/30 bg-background/70 text-on-surface backdrop-blur-md transition-transform";

export const BOARD_CARD_CHEVRON_OPEN_CLASS = "rotate-180";

export const resolveBoardCardChevronClassName = (
  isOpen: boolean
): string =>
  joinClassNames(
    BOARD_CARD_CHEVRON_CLASS,
    isOpen && BOARD_CARD_CHEVRON_OPEN_CLASS
  );

export const BOARD_CARD_LINES_CLASS =
  "flex flex-col gap-sm border-t border-outline-variant p-sm md:p-md";

export const BOARD_CARD_LINE_CLASS =
  "flex items-baseline justify-between gap-xs";

export const BOARD_CARD_LINE_NAME_CLASS =
  "min-w-0 break-words text-sm font-semibold text-on-surface";

export const BOARD_CARD_LINE_FREE_CLASS =
  "shrink-0 text-sm tabular-nums text-primary";
