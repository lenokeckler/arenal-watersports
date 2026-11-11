import type { CategoryDepositRow } from "../models/CategoryDepositRow.type";
import {
  CATEGORY_DEPOSIT_ID,
  DEFAULT_CATEGORY_DEPOSIT,
} from "./CategoryDepositFormValues.constants";

export const DEPOSIT_ROW_COLUMNS = [
  "deposit_crc",
  "deposit_usd",
  "updated_by",
];

export const DEFAULT_CATEGORY_DEPOSIT_ROW: CategoryDepositRow =
  {
    id: CATEGORY_DEPOSIT_ID,
    deposit_crc: DEFAULT_CATEGORY_DEPOSIT.depositCrc,
    deposit_usd: DEFAULT_CATEGORY_DEPOSIT.depositUsd,
  };

export const buildCategoryDepositRow = (
  overrides: Partial<CategoryDepositRow> = {}
): CategoryDepositRow => ({
  ...DEFAULT_CATEGORY_DEPOSIT_ROW,
  ...overrides,
});
