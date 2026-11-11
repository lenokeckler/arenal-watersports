import type { Money } from "@/app/utils/money/models/Money.interface";

export interface IncomeNetRowProps {
  net: Money;
  isNegative: boolean;
}
