import type { DailyIncome } from "@/app/services/income";

export const hasAnyIncome = ({
  currencies,
}: DailyIncome): boolean =>
  currencies.some(
    ({ byPaymentMethod }) => byPaymentMethod.length > 0
  );
