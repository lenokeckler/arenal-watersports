import { normalizeMoneyAmountText } from "@/app/utils/money/normalizeMoneyAmountText";

export const parseReservationRefundAmount = (
  amountText: string
): number =>
  Number(normalizeMoneyAmountText(amountText.trim()));
