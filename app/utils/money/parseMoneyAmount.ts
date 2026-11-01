import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { normalizeMoneyAmountText } from "./normalizeMoneyAmountText";

export const parseMoneyAmount = (
  amountText: string
): NullableRef<number> => {
  const trimmedText = amountText.trim();
  return trimmedText === STRING.Empty
    ? null
    : Number(normalizeMoneyAmountText(trimmedText));
};
