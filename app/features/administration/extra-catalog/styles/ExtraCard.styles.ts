import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import type { ExtraStatus } from "../models/ExtraStatus.type";

export const EXTRA_CARD_CONTAINER_CLASS =
  "flex flex-col gap-3 rounded-xl border border-outline-variant bg-surface-container/60 p-4 md:flex-row md:items-center";

export const EXTRA_CARD_HEADING_ROW_CLASS =
  "flex items-center justify-between gap-3 md:min-w-0 md:flex-1";

export const EXTRA_CARD_NAME_CLASS =
  "min-w-0 break-words text-title-md font-medium text-on-surface";

const EXTRA_CARD_STATUS_CHIP_BASE_CLASS =
  "inline-flex min-h-8 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-medium";

const EXTRA_CARD_STATUS_DOT_BASE_CLASS =
  "h-2 w-2 rounded-full";

export const EXTRA_CARD_STATUS_CHIP_CLASS: Record<
  ExtraStatus,
  string
> = {
  [EXTRA_STATUS.ACTIVE]: `${EXTRA_CARD_STATUS_CHIP_BASE_CLASS} bg-primary/10 text-primary`,
  [EXTRA_STATUS.INACTIVE]: `${EXTRA_CARD_STATUS_CHIP_BASE_CLASS} bg-error-container/40 text-error`,
};

export const EXTRA_CARD_STATUS_DOT_CLASS: Record<
  ExtraStatus,
  string
> = {
  [EXTRA_STATUS.ACTIVE]: `${EXTRA_CARD_STATUS_DOT_BASE_CLASS} bg-primary`,
  [EXTRA_STATUS.INACTIVE]: `${EXTRA_CARD_STATUS_DOT_BASE_CLASS} bg-error`,
};
