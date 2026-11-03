import type { CurrencyCode } from "@/app/constants";
import type { Money } from "@/app/utils/money/models/Money.interface";

export interface CurrencyIncomeDisplay {
  currency: CurrencyCode;
  hasMovement: boolean;
  collected: Money;
  refunded: Money;
  net: Money;
  isNetNegative: boolean;
}
