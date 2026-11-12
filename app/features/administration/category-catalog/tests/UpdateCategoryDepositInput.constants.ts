import type { UpdateCategoryDepositInput } from "../models/UpdateCategoryDepositInput.interface";
import {
  CATEGORY_DEPOSIT_ID,
  DEFAULT_CATEGORY_DEPOSIT,
} from "./CategoryDepositFormValues.constants";

export const FAKE_DEPOSIT_ADMIN_WORKER_ID =
  "fake-deposit-admin-worker-id";

export const DEFAULT_UPDATE_CATEGORY_DEPOSIT_INPUT: UpdateCategoryDepositInput =
  {
    categoryId: CATEGORY_DEPOSIT_ID,
    depositCrc: DEFAULT_CATEGORY_DEPOSIT.depositCrc,
    depositUsd: DEFAULT_CATEGORY_DEPOSIT.depositUsd,
  };

export const INPUT_WITHOUT_AMOUNTS = {
  categoryId: CATEGORY_DEPOSIT_ID,
} as UpdateCategoryDepositInput;

export const buildUpdateCategoryDepositInput = (
  overrides: Partial<UpdateCategoryDepositInput> = {}
): UpdateCategoryDepositInput => ({
  ...DEFAULT_UPDATE_CATEGORY_DEPOSIT_INPUT,
  ...overrides,
});
