import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { CategoryDeposit } from "../models/CategoryDeposit.interface";
import type { CategoryDepositFormValues } from "../models/CategoryDepositFormValues.interface";

export const mapCategoryDepositToFormValues = (
  deposit: CategoryDeposit
): CategoryDepositFormValues => ({
  depositUsd: safeString(deposit.depositUsd?.toString()),
  depositCrc: safeString(deposit.depositCrc?.toString()),
});
