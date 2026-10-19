"use server";

import { CUSTOM_COMBO_RESERVATION_COPY } from "../constants/CustomComboReservationCopy.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import type { CustomComboPricingActionResult } from "../models/CustomComboPricingActionResult.type";
import type { CustomComboPricingInput } from "../models/CustomComboPricingInput.interface";
import { getCustomComboPrice } from "../services/getCustomComboPrice";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { hasValidCustomComboEquipmentSelections } from "../utils/hasValidCustomComboEquipmentSelections";
import { isCustomComboPricingInput } from "../utils/isCustomComboPricingInput";
import { isValidCustomComboPricingDuration } from "../utils/isValidCustomComboPricingDuration";

const invalidPricingResult =
  (): CustomComboPricingActionResult => ({
    errors: {
      [CUSTOM_COMBO_RESERVATION_FIELD.ITEMS]:
        CUSTOM_COMBO_RESERVATION_COPY.ITEM_SELECTION,
    },
    ok: false,
  });

const isValidPricingInput = (
  input: CustomComboPricingInput
): boolean =>
  isValidCustomComboPricingDuration(input.durationHours) &&
  hasValidCustomComboEquipmentSelections(input.items);

export const getCustomComboPricingAction = async (
  input: unknown
): Promise<CustomComboPricingActionResult> => {
  if (!isCustomComboPricingInput(input)) {
    return invalidPricingResult();
  }
  if (!isValidPricingInput(input)) {
    return invalidPricingResult();
  }

  await getAuthorizedReservationFormClient();

  const pricing = await getCustomComboPrice({
    durationHours: input.durationHours,
    items: input.items,
  });

  return { ok: true, pricing };
};
