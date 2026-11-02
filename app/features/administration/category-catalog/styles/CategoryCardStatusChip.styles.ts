import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import type { CategoryStatus } from "../models/CategoryStatus.type";

const CATEGORY_CARD_STATUS_CHIP_BASE_CLASS =
  "col-start-2 row-start-2 inline-flex min-h-8 items-center justify-self-end gap-2 rounded-full px-3 text-sm font-medium";

const CATEGORY_CARD_STATUS_DOT_BASE_CLASS =
  "h-2 w-2 rounded-full";

export const CATEGORY_CARD_STATUS_CHIP_CLASS: Record<
  CategoryStatus,
  string
> = {
  [CATEGORY_STATUS.ACTIVE]: `${CATEGORY_CARD_STATUS_CHIP_BASE_CLASS} bg-primary/10 text-primary`,
  [CATEGORY_STATUS.INACTIVE]: `${CATEGORY_CARD_STATUS_CHIP_BASE_CLASS} bg-error-container/40 text-error`,
};

export const CATEGORY_CARD_STATUS_DOT_CLASS: Record<
  CategoryStatus,
  string
> = {
  [CATEGORY_STATUS.ACTIVE]: `${CATEGORY_CARD_STATUS_DOT_BASE_CLASS} bg-primary`,
  [CATEGORY_STATUS.INACTIVE]: `${CATEGORY_CARD_STATUS_DOT_BASE_CLASS} bg-error`,
};
