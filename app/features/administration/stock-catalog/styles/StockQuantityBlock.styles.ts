import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import {
  STOCK_QUANTITY_FIELD,
  type StockQuantityField,
} from "../constants/StockQuantityField.constants";

export const STOCK_QUANTITY_BLOCK_BASE_CLASS =
  "flex min-w-0 flex-col gap-3 rounded-2xl border p-4";

export const STOCK_QUANTITY_BLOCK_CLASS: Record<
  StockQuantityField,
  string
> = {
  [STOCK_QUANTITY_FIELD.AVAILABLE]: `${STOCK_QUANTITY_BLOCK_BASE_CLASS} border-card-tint-available-border bg-card-tint-available-bg`,
  [STOCK_QUANTITY_FIELD.DAMAGED]: `${STOCK_QUANTITY_BLOCK_BASE_CLASS} border-card-tint-damaged-border bg-card-tint-damaged-bg`,
  [STOCK_QUANTITY_FIELD.IN_REPAIR]: `${STOCK_QUANTITY_BLOCK_BASE_CLASS} border-card-tint-occupied-border bg-card-tint-occupied-bg`,
};

export const STOCK_QUANTITY_HEADING_CLASS =
  "flex items-baseline justify-between gap-2";

export const STOCK_QUANTITY_LABEL_CLASS =
  "whitespace-nowrap";

export const STOCK_QUANTITY_CHANGE_BASE_CLASS =
  "text-body-base font-semibold";

export const STOCK_QUANTITY_CHANGE_CLASS: Record<
  StockQuantityField,
  string
> = {
  [STOCK_QUANTITY_FIELD.AVAILABLE]: `${STOCK_QUANTITY_CHANGE_BASE_CLASS} text-primary`,
  [STOCK_QUANTITY_FIELD.DAMAGED]: `${STOCK_QUANTITY_CHANGE_BASE_CLASS} text-error`,
  [STOCK_QUANTITY_FIELD.IN_REPAIR]: `${STOCK_QUANTITY_CHANGE_BASE_CLASS} text-tertiary`,
};

export const STOCK_QUANTITY_STEPPER_CLASS =
  "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 md:grid-cols-2";

export const STOCK_QUANTITY_STEP_BUTTON_CLASS =
  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-outline bg-surface-container-highest text-headline-lg-mobile font-semibold text-on-surface transition-colors hover:bg-surface-bright active:bg-surface-container disabled:opacity-50 md:w-full md:rounded-xl";

export const STOCK_QUANTITY_INPUT_BASE_CLASS =
  "min-h-14 w-full min-w-0 rounded-xl border bg-surface-container-highest px-2 text-center text-headline-lg-mobile font-semibold text-on-surface focus:outline-none focus:ring-2 disabled:opacity-50 md:order-first md:col-span-2";

export const STOCK_QUANTITY_INPUT_VALID_CLASS =
  "border-outline focus:ring-primary";

export const STOCK_QUANTITY_INPUT_ERROR_CLASS =
  "border-error focus:ring-error";

export const STOCK_QUANTITY_ERROR_CLASS =
  "text-sm text-error";

export const resolveStockQuantityInputClassName = (
  hasError: boolean
): string =>
  joinClassNames(
    STOCK_QUANTITY_INPUT_BASE_CLASS,
    hasError
      ? STOCK_QUANTITY_INPUT_ERROR_CLASS
      : STOCK_QUANTITY_INPUT_VALID_CLASS
  );
