import { normalizeMoneyAmountText } from "@/app/utils/money/normalizeMoneyAmountText";

export const parseDepositResolutionAmount = (
  text: string
): number => Number(normalizeMoneyAmountText(text.trim()));
