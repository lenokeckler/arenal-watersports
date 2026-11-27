import { normalizeMoneyAmountText } from "@/app/utils/money/normalizeMoneyAmountText";

export const parseReservationDepositAmount = (
  amountText: string
): number =>
  Number(normalizeMoneyAmountText(amountText.trim()));
