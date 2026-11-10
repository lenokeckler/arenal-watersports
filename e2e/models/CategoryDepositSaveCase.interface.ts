import type { CurrencyCode } from "@/app/constants";
import type { CategoryDepositAmounts } from "./CategoryDepositAmounts.interface";

export interface CategoryDepositSaveCase {
  amountText: string;
  currency: CurrencyCode;
  expected: CategoryDepositAmounts;
  scenario: string;
}
