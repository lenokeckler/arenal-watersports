import { STOCK_ADJUSTMENT_REASON } from "../constants/StockAdjustmentReason.constants";
import { STOCK_MUTATION_STATUS } from "../constants/StockMutationStatus.constants";
import type { StockCountViewProps } from "../models/StockCountViewProps.interface";
import type { StockFormValues } from "../models/StockFormValues.interface";
import type { StockMutationResult } from "../models/StockMutationResult.interface";
import {
  DEFAULT_STOCK_CATEGORY,
  DEFAULT_STOCK_LEVELS,
  DEFAULT_STOCK_MOVEMENT_ITEM,
} from "./Stock.constants";

export const NOT_FOUND_ERROR_MESSAGE = "NEXT_NOT_FOUND";
export const REDIRECT_ERROR_MESSAGE = "NEXT_REDIRECT";
export const PAGE_PAST_THE_END = "9";
export const MIDDLE_PAGE = 2;
export const MIDDLE_PAGE_COUNT = 3;
export const LAST_PAGE_COUNT = 2;

export const TYPED_AVAILABLE = "7";
export const TYPED_DAMAGED = "3";
export const TYPED_IN_REPAIR = "2";
export const TYPED_TOTAL = 12;
export const INVALID_QUANTITY_TEXT = "abc";
export const FRACTION_QUANTITY_TEXT = "1.5";
export const SPACED_QUANTITY_TEXT = " 4 ";
export const SPACED_QUANTITY = 4;
export const TYPED_EXPIRY_DATE = "2027-05-20";
export const EXPECTED_DATE_PATTERN = /2026/;
export const EXPECTED_COSTA_RICA_TIME_PATTERN = /9:00/;

export const SAVE_SUCCESS_RESULT: StockMutationResult = {
  status: STOCK_MUTATION_STATUS.SUCCESS,
};

export const SAVE_ERROR_MESSAGE = "Mensaje del servidor";

export const SAVE_ERROR_RESULT: StockMutationResult = {
  message: SAVE_ERROR_MESSAGE,
  status: STOCK_MUTATION_STATUS.ERROR,
};

export const DEFAULT_STOCK_FORM_VALUES: StockFormValues = {
  available: "10",
  damaged: "2",
  expiryDate: "",
  inRepair: "1",
  reason: STOCK_ADJUSTMENT_REASON.COUNT_CORRECTION,
};

export const DEFAULT_STOCK_COUNT_VIEW_PROPS: StockCountViewProps =
  {
    category: DEFAULT_STOCK_CATEGORY,
    currentPage: 1,
    fetchFailed: false,
    levels: DEFAULT_STOCK_LEVELS,
    movements: [DEFAULT_STOCK_MOVEMENT_ITEM],
    pageCount: 1,
  };

export const buildStockCountViewProps = (
  overrides: Partial<StockCountViewProps> = {}
): StockCountViewProps => ({
  ...DEFAULT_STOCK_COUNT_VIEW_PROPS,
  ...overrides,
});

export const buildStockFormValues = (
  overrides: Partial<StockFormValues> = {}
): StockFormValues => ({
  ...DEFAULT_STOCK_FORM_VALUES,
  ...overrides,
});

export const throwNavigation = (message: string) => () => {
  throw new Error(message);
};
