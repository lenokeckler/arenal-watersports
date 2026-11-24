import { COMBO_STATUS } from "../constants/ComboStatus.constants";
import type { ComboStatus } from "../models/ComboStatus.type";

const COMBO_CARD_BASE_CLASS =
  "flex flex-col gap-3 rounded-xl border border-outline-variant bg-surface-container/60 p-4 md:flex-row md:items-center";

export const COMBO_CARD_CONTAINER_CLASS: Record<
  ComboStatus,
  string
> = {
  [COMBO_STATUS.ACTIVE]: COMBO_CARD_BASE_CLASS,
  [COMBO_STATUS.INACTIVE]: `${COMBO_CARD_BASE_CLASS} opacity-60`,
};

export const COMBO_CARD_BODY_CLASS =
  "flex flex-col gap-1 md:min-w-0 md:flex-1";

export const COMBO_CARD_HEADING_ROW_CLASS =
  "flex items-center justify-between gap-3";

export const COMBO_CARD_NAME_CLASS =
  "min-w-0 break-words text-title-md font-medium text-on-surface";

export const COMBO_CARD_ITEMS_CLASS =
  "text-sm text-on-surface-variant";

export const COMBO_CARD_PRICE_CLASS =
  "text-sm font-medium text-on-surface";

const COMBO_CARD_STATUS_CHIP_BASE_CLASS =
  "inline-flex min-h-8 shrink-0 items-center rounded-full px-3 text-sm font-medium";

export const COMBO_CARD_STATUS_CHIP_CLASS: Record<
  ComboStatus,
  string
> = {
  [COMBO_STATUS.ACTIVE]: `${COMBO_CARD_STATUS_CHIP_BASE_CLASS} bg-primary/10 text-primary`,
  [COMBO_STATUS.INACTIVE]: `${COMBO_CARD_STATUS_CHIP_BASE_CLASS} bg-error-container/40 text-error`,
};

const COMBO_CARD_ACTION_CLASS =
  "inline-flex min-h-11 w-full items-center justify-center rounded-md border px-4 text-body-base transition-colors md:w-40";

export const COMBO_CARD_REACTIVATE_BUTTON_CLASS = `${COMBO_CARD_ACTION_CLASS} border-outline-variant text-on-surface hover:bg-surface-container-high`;

export const COMBO_CARD_REMOVE_BUTTON_CLASS = `${COMBO_CARD_ACTION_CLASS} border-error text-error hover:bg-error-container/30`;

export const COMBO_REMOVAL_SHEET_BODY_CLASS =
  "flex flex-col gap-4";

export const COMBO_REMOVAL_SHEET_BUTTONS_CLASS =
  "grid grid-cols-2 gap-3";
