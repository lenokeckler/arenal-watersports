import type { NullableRef } from "@/app/types";
import { CUSTOM_COMBO_FORM_CURRENCY } from "../constants/CustomComboFormCopy.constants";

export const formatCustomComboAmount = (
  amount: NullableRef<number>,
  currency: string
): string => {
  if (amount === null) {
    return "—";
  }
  return new Intl.NumberFormat(
    CUSTOM_COMBO_FORM_CURRENCY.LOCALE,
    { currency, style: "currency" }
  ).format(amount);
};
