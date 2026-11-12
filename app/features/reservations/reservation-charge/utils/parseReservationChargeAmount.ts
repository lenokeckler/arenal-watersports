import { normalizeMoneyAmountText } from "@/app/utils/money/normalizeMoneyAmountText";

export const parseReservationChargeAmount = (
  amountText: string
): number =>
  Number(normalizeMoneyAmountText(amountText.trim()));
