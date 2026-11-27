import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import type { ExtraStatus } from "../models/ExtraStatus.type";

export const EXTRA_CARD_CONTAINER_CLASS =
  "flex flex-col gap-3 rounded-xl border border-outline-variant bg-surface-container/60 p-4 md:flex-row md:items-center";

const EXTRA_CARD_BODY_BASE_CLASS =
  "flex flex-col gap-2.5 rounded-lg text-on-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:min-w-0 md:flex-1";

export const EXTRA_CARD_BODY_CLASS: Record<
  ExtraStatus,
  string
> = {
  [EXTRA_STATUS.ACTIVE]: EXTRA_CARD_BODY_BASE_CLASS,
  [EXTRA_STATUS.INACTIVE]: `${EXTRA_CARD_BODY_BASE_CLASS} opacity-60`,
};

export const EXTRA_CARD_HEADING_ROW_CLASS =
  "flex items-start justify-between gap-2.5";

export const EXTRA_CARD_NAME_BLOCK_CLASS =
  "flex min-w-0 flex-col gap-0.5";

export const EXTRA_CARD_NAME_CLASS =
  "break-words text-lg font-bold leading-tight text-on-surface";

export const EXTRA_CARD_PRICE_CLASS =
  "text-base font-bold text-on-surface";

export const EXTRA_CARD_STATUS_BLOCK_CLASS =
  "flex shrink-0 flex-col items-end gap-1";

export const EXTRA_CARD_EDIT_CUE_CLASS =
  "inline-flex min-h-8 items-center gap-0.5 font-bold text-primary";

export const EXTRA_CARD_EDIT_ICON_CLASS = "text-xl";

export const EXTRA_CARD_FACTS_CLASS =
  "flex flex-col gap-1.5 border-t border-outline-variant pt-2.5";

export const EXTRA_CARD_FACT_CLASS =
  "flex flex-wrap items-center gap-x-2.5 gap-y-1 text-base text-on-surface";

export const EXTRA_CARD_FACT_ICON_CLASS =
  "shrink-0 text-xl text-on-surface-variant";

export const EXTRA_CARD_MISSING_CLASS =
  "inline-flex items-center rounded-full border border-dashed border-outline px-2.5 py-0.5 text-sm font-bold text-on-surface-variant";

export const EXTRA_CARD_MISSING_NOTE_CLASS =
  "text-sm text-on-surface-variant";

const EXTRA_CARD_STATUS_CHIP_BASE_CLASS =
  "inline-flex min-h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-bold";

const EXTRA_CARD_STATUS_DOT_BASE_CLASS =
  "h-2 w-2 rounded-full";

export const EXTRA_CARD_STATUS_CHIP_CLASS: Record<
  ExtraStatus,
  string
> = {
  [EXTRA_STATUS.ACTIVE]: `${EXTRA_CARD_STATUS_CHIP_BASE_CLASS} bg-primary/15 text-primary`,
  [EXTRA_STATUS.INACTIVE]: `${EXTRA_CARD_STATUS_CHIP_BASE_CLASS} bg-error-container/40 text-error`,
};

export const EXTRA_CARD_STATUS_DOT_CLASS: Record<
  ExtraStatus,
  string
> = {
  [EXTRA_STATUS.ACTIVE]: `${EXTRA_CARD_STATUS_DOT_BASE_CLASS} bg-primary`,
  [EXTRA_STATUS.INACTIVE]: `${EXTRA_CARD_STATUS_DOT_BASE_CLASS} bg-error`,
};
