import { parseMoneyAmount } from "@/app/utils/money/parseMoneyAmount";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import type { CategoryDepositFormValues } from "../models/CategoryDepositFormValues.interface";
import { toFiniteNumberOrNull } from "./toFiniteNumberOrNull";

export const applyCategoryDepositValues = (
  configuration: CategoryConfiguration,
  values: CategoryDepositFormValues
): CategoryConfiguration => ({
  ...configuration,
  deposit: {
    ...configuration.deposit,
    depositUsd: toFiniteNumberOrNull(
      parseMoneyAmount(values.depositUsd)
    ),
    depositCrc: toFiniteNumberOrNull(
      parseMoneyAmount(values.depositCrc)
    ),
  },
});
