import type { Money } from "@/app/utils/money/models/Money.interface";

export interface IncomeMovements {
  charges: readonly Money[];
  refunds: readonly Money[];
}
