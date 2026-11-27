import { COMBO_STATUS } from "../constants/ComboStatus.constants";
import type { ComboStatus } from "../models/ComboStatus.type";

export const COMBO_CARD_CONTAINER_CLASS =
  "flex flex-col gap-3.5 rounded-xl border border-outline-variant bg-surface-container/60 p-4 md:flex-row md:items-center";

const COMBO_CARD_BODY_BASE_CLASS =
  "flex flex-col gap-1.5 md:min-w-0 md:flex-1";

export const COMBO_CARD_BODY_CLASS: Record<
  ComboStatus,
  string
> = {
  [COMBO_STATUS.ACTIVE]: COMBO_CARD_BODY_BASE_CLASS,
  [COMBO_STATUS.INACTIVE]: `${COMBO_CARD_BODY_BASE_CLASS} opacity-60`,
};

export const COMBO_CARD_ACTIONS_ROW_CLASS =
  "grid grid-cols-2 gap-2 md:flex md:shrink-0";

const COMBO_CARD_ACTION_CLASS =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 px-4 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none md:w-40";

export const COMBO_CARD_EDIT_LINK_CLASS = `${COMBO_CARD_ACTION_CLASS} border-outline text-on-surface hover:bg-surface-container-high`;

export const COMBO_CARD_HEADING_ROW_CLASS =
  "flex items-start justify-between gap-2.5";

export const COMBO_CARD_NAME_CLASS =
  "min-w-0 break-words text-lg font-bold leading-tight text-on-surface";

export const COMBO_CARD_ITEMS_CLASS =
  "flex items-start gap-2 text-sm text-on-surface-variant";

export const COMBO_CARD_ITEMS_ICON_CLASS =
  "shrink-0 text-lg";

export const COMBO_CARD_PRICE_CLASS =
  "flex flex-wrap items-baseline gap-x-1.5 text-2xl font-bold text-on-surface";

export const COMBO_CARD_PRICE_UNIT_CLASS =
  "text-sm font-normal text-on-surface-variant";

const COMBO_CARD_STATUS_CHIP_BASE_CLASS =
  "inline-flex min-h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-bold";

export const COMBO_CARD_STATUS_CHIP_CLASS: Record<
  ComboStatus,
  string
> = {
  [COMBO_STATUS.ACTIVE]: `${COMBO_CARD_STATUS_CHIP_BASE_CLASS} bg-primary/15 text-primary`,
  [COMBO_STATUS.INACTIVE]: `${COMBO_CARD_STATUS_CHIP_BASE_CLASS} bg-error-container/40 text-error`,
};

export const COMBO_CARD_STATUS_DOT_CLASS =
  "size-2 rounded-full bg-current";

export const COMBO_CARD_REACTIVATE_BUTTON_CLASS = `${COMBO_CARD_ACTION_CLASS} border-transparent bg-primary/15 text-primary hover:bg-primary/25`;

export const COMBO_CARD_REMOVE_BUTTON_CLASS = `${COMBO_CARD_ACTION_CLASS} border-error text-error hover:bg-error-container/30`;

export const COMBO_REMOVAL_SHEET_BODY_CLASS =
  "flex flex-col gap-4";

export const COMBO_REMOVAL_SHEET_BUTTONS_CLASS =
  "grid grid-cols-2 gap-3";
