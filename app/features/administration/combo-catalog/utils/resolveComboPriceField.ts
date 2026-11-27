import { COMBO_AUDIENCE_CURRENCY } from "../constants/ComboAudienceCurrency.constants";
import {
  COMBO_PRICE_LABEL,
  COMBO_PRICE_PLACEHOLDER,
} from "../constants/ComboPriceFieldCopy.constants";
import type { ComboAudience } from "../models/ComboAudience.type";
import type { ComboPriceField } from "../models/ComboPriceField.interface";

export const resolveComboPriceField = (
  audience: ComboAudience
): ComboPriceField => ({
  currency: COMBO_AUDIENCE_CURRENCY[audience],
  label: COMBO_PRICE_LABEL[audience],
  placeholder: COMBO_PRICE_PLACEHOLDER[audience],
});
