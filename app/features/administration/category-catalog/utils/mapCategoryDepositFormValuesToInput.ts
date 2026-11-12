import { parseMoneyAmount } from "@/app/utils/money/parseMoneyAmount";
import type { CategoryDepositFormValues } from "../models/CategoryDepositFormValues.interface";
import type { UpdateCategoryDepositInput } from "../models/UpdateCategoryDepositInput.interface";

export const mapCategoryDepositFormValuesToInput = (
  categoryId: string,
  values: CategoryDepositFormValues
): UpdateCategoryDepositInput => ({
  categoryId,
  depositUsd: parseMoneyAmount(values.depositUsd),
  depositCrc: parseMoneyAmount(values.depositCrc),
});
