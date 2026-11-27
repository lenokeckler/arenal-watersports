export const BOARD_LAYOUT_CONTROLS_CLASS =
  "mt-2 flex flex-col gap-3 border-t border-outline/60 pt-3";

export const BOARD_LAYOUT_LABEL_CLASS =
  "text-body-sm uppercase tracking-wide text-on-surface-variant";

export const BOARD_LAYOUT_HINT_CLASS =
  "text-body-sm text-on-surface-variant";

export const BOARD_LAYOUT_COLUMNS_GROUP_CLASS =
  "grid grid-cols-2 gap-2";

const BOARD_LAYOUT_COLUMNS_OPTION_BASE_CLASS =
  "min-h-11 rounded-lg px-3 text-body-md";

export const BOARD_LAYOUT_COLUMNS_OPTION_IDLE_CLASS = `${BOARD_LAYOUT_COLUMNS_OPTION_BASE_CLASS} border border-outline text-on-surface-variant hover:bg-surface-container-high`;

export const BOARD_LAYOUT_COLUMNS_OPTION_SELECTED_CLASS = `${BOARD_LAYOUT_COLUMNS_OPTION_BASE_CLASS} border-2 border-primary bg-primary/15 font-semibold text-on-surface`;

export const BOARD_LAYOUT_ORDER_LIST_CLASS =
  "flex flex-col gap-2";

const BOARD_LAYOUT_ORDER_ITEM_BASE_CLASS =
  "flex min-h-12 items-center justify-between gap-2 rounded-lg border pl-3 text-body-md text-on-surface";

export const BOARD_LAYOUT_ORDER_ITEM_IDLE_CLASS = `${BOARD_LAYOUT_ORDER_ITEM_BASE_CLASS} border-outline bg-surface-container-high`;

export const BOARD_LAYOUT_ORDER_ITEM_DRAGGED_CLASS = `${BOARD_LAYOUT_ORDER_ITEM_BASE_CLASS} border-primary bg-primary/15 shadow-lg`;

export const BOARD_LAYOUT_ORDER_ITEM_LABEL_CLASS =
  "min-w-0 flex-1 truncate";

export const BOARD_LAYOUT_HANDLE_CLASS =
  "flex min-h-12 min-w-12 shrink-0 cursor-grab touch-none select-none items-center justify-center rounded-lg text-on-surface-variant hover:text-primary focus-visible:outline-2 focus-visible:outline-primary active:cursor-grabbing";

export const resolveBoardLayoutOrderItemClassName = (
  isDragged: boolean
): string =>
  isDragged
    ? BOARD_LAYOUT_ORDER_ITEM_DRAGGED_CLASS
    : BOARD_LAYOUT_ORDER_ITEM_IDLE_CLASS;

export const resolveBoardLayoutColumnsOptionClassName = (
  isSelected: boolean
): string =>
  isSelected
    ? BOARD_LAYOUT_COLUMNS_OPTION_SELECTED_CLASS
    : BOARD_LAYOUT_COLUMNS_OPTION_IDLE_CLASS;
