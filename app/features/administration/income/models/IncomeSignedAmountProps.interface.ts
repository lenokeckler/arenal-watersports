import type { Money } from "@/app/utils/money/models/Money.interface";

export interface IncomeSignedAmountProps {
  money: Money;
  hasSignGlyph?: boolean;
  isSpokenNegative?: boolean;
}
