import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import type { SubmitCustomComboDraftOptions } from "../models/SubmitCustomComboDraftOptions.interface";
import { createCustomComboReservationInput } from "./createCustomComboReservationInput";
import { hasValidCustomComboEquipmentSelections } from "./hasValidCustomComboEquipmentSelections";

export const submitCustomComboDraft = (
  options: SubmitCustomComboDraftOptions
): void => {
  if (
    !hasValidCustomComboEquipmentSelections(
      options.customCombo.draft.items
    )
  ) {
    options.setFieldError(
      RESERVATION_FORM_FIELD.ITEMS,
      RESERVATION_FORM_COPY[RESERVATION_FORM_FIELD.ITEMS]
    );
    options.requestErrorFocus();
    return;
  }

  options.submitCustomComboReservation(
    createCustomComboReservationInput({
      draft: options.customCombo.draft,
      durationHours: options.durationHours,
      hasGuideOnlyItem:
        options.customCombo.hasGuideOnlyItem,
      values: options.values,
    })
  );
};
