import { STRING } from "@/app/constants";
import { COMBO_AUDIENCE_ORDER } from "../constants/ComboAudienceOrder.constants";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import type { ComboFormErrors } from "../models/ComboFormErrors.interface";
import type { ComboFormValues } from "../models/ComboFormValues.interface";
import { validateComboItems } from "./validateComboItems";
import { validateComboPriceText } from "./validateComboPriceText";

export const validateComboFormValues = (
  values: ComboFormValues
): ComboFormErrors => {
  const { itemErrors, itemsError } = validateComboItems(
    values.items
  );
  const isAudienceChosen = COMBO_AUDIENCE_ORDER.includes(
    values.audience
  );
  const priceError = isAudienceChosen
    ? validateComboPriceText(
        values.priceText,
        values.audience
      )
    : undefined;
  const fieldErrors = {
    ...(values.name.trim() === STRING.Empty
      ? { name: COMBO_FORM_COPY.NAME_REQUIRED_ERROR }
      : {}),
    ...(isAudienceChosen
      ? {}
      : {
          audience: COMBO_FORM_COPY.AUDIENCE_REQUIRED_ERROR,
        }),
    ...(priceError ? { price: priceError } : {}),
    ...(itemsError ? { items: itemsError } : {}),
  };
  const itemErrorCount = itemErrors.reduce(
    (total, rowErrors) =>
      total + Object.keys(rowErrors).length,
    0
  );

  return {
    ...fieldErrors,
    count: Object.keys(fieldErrors).length + itemErrorCount,
    itemErrors,
  };
};
