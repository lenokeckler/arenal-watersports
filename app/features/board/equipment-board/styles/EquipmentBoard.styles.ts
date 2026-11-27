import {
  BOARD_LAYOUT_COLUMNS,
  type BoardLayoutColumns,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const EQUIPMENT_BOARD_PAGE_CLASS =
  "mx-auto w-full max-w-7xl px-margin-mobile py-md md:px-margin-desktop";

export const EQUIPMENT_BOARD_HEADER_CLASS =
  "mb-md flex items-center gap-sm";

export const EQUIPMENT_BOARD_ICON_TILE_CLASS =
  "flex size-12 shrink-0 items-center justify-center rounded-xl border border-outline-variant bg-surface-container text-primary shadow-lg";

export const EQUIPMENT_BOARD_ICON_CLASS = "text-3xl";

export const EQUIPMENT_BOARD_HEADING_GROUP_CLASS =
  "flex min-w-0 flex-col";

export const EQUIPMENT_BOARD_TITLE_CLASS =
  "font-sans text-headline-lg-mobile text-on-surface md:text-headline-lg";

export const EQUIPMENT_BOARD_DESCRIPTION_CLASS =
  "max-w-prose text-body-base text-on-surface-variant";

export const EQUIPMENT_BOARD_GRID_CLASS =
  "flex flex-wrap justify-center gap-sm md:gap-md";

const EQUIPMENT_BOARD_GRID_ITEM_BASE_CLASS =
  "flex shrink-0 grow-0 min-w-0";

export const EQUIPMENT_BOARD_GRID_ITEM_CLASS = `${EQUIPMENT_BOARD_GRID_ITEM_BASE_CLASS} w-[calc((100%-var(--spacing-sm))/2)] md:w-[calc((100%-2*var(--spacing-md))/3)]`;

export const EQUIPMENT_BOARD_GRID_ITEM_BY_COLUMNS_CLASS: Record<
  BoardLayoutColumns,
  string
> = {
  [BOARD_LAYOUT_COLUMNS.THREE]: `${EQUIPMENT_BOARD_GRID_ITEM_BASE_CLASS} w-[calc((100%-2*var(--spacing-sm))/3)] md:w-[calc((100%-2*var(--spacing-md))/3)]`,
  [BOARD_LAYOUT_COLUMNS.TWO]: `${EQUIPMENT_BOARD_GRID_ITEM_BASE_CLASS} w-[calc((100%-var(--spacing-sm))/2)] md:w-[calc((100%-var(--spacing-md))/2)]`,
};

const EQUIPMENT_BOARD_GRID_ITEM_DRAGGABLE_CLASS =
  "select-none [-webkit-touch-callout:none]";

const EQUIPMENT_BOARD_GRID_ITEM_DRAGGED_CLASS =
  "relative z-10 scale-105 rounded-xl opacity-90 shadow-xl ring-2 ring-primary transition-transform motion-reduce:transition-none";

const resolveGridItemWidthClassName = (
  columns: NullableRef<BoardLayoutColumns>
): string =>
  columns === null
    ? EQUIPMENT_BOARD_GRID_ITEM_CLASS
    : EQUIPMENT_BOARD_GRID_ITEM_BY_COLUMNS_CLASS[columns];

export const resolveEquipmentBoardGridItemClassName = (
  columns: NullableRef<BoardLayoutColumns>,
  isDragged = false
): string =>
  joinClassNames(
    resolveGridItemWidthClassName(columns),
    EQUIPMENT_BOARD_GRID_ITEM_DRAGGABLE_CLASS,
    isDragged && EQUIPMENT_BOARD_GRID_ITEM_DRAGGED_CLASS
  );

export const EQUIPMENT_BOARD_DRAG_HINT_CLASS =
  "text-center text-sm text-on-surface-variant";

export const EQUIPMENT_BOARD_TOOLBAR_CLASS =
  "mb-md flex flex-wrap items-center justify-between gap-sm";

export const EQUIPMENT_BOARD_PENDING_LINK_CLASS =
  "inline-flex min-h-12 items-center gap-sm rounded-xl border border-primary/40 bg-primary/10 px-md transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const EQUIPMENT_BOARD_PENDING_TITLE_CLASS =
  "text-button font-semibold text-primary";

export const EQUIPMENT_BOARD_PENDING_BADGE_CLASS =
  "text-button font-bold tabular-nums text-primary";
