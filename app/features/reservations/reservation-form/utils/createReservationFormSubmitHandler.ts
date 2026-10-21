import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import type { ReservationFormSubmitOptions } from "../models/ReservationFormSubmitOptions.interface";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { hasValidCustomComboEquipmentSelections } from "./hasValidCustomComboEquipmentSelections";
import { createCustomComboReservationInput } from "./createCustomComboReservationInput";

const setMissingConcreteUnitError = (
  options: ReservationFormSubmitOptions
): boolean => {
  if (
    !options.requiresConcreteUnit ||
    options.values.unitId.trim()
  ) {
    return false;
  }
  options.setFieldError(
    RESERVATION_FORM_FIELD.UNIT_ID,
    RESERVATION_FORM_COPY[RESERVATION_FORM_FIELD.UNIT_ID]
  );
  return true;
};

export const createReservationFormSubmitHandler =
  (
    options: ReservationFormSubmitOptions
  ): ReservationFormViewModel["handleSubmit"] =>
  (event) => {
    event.preventDefault();
    if (
      options.values.reservationType ===
      RESERVATION_TYPE.COMBO
    ) {
      if (
        !hasValidCustomComboEquipmentSelections(
          options.customCombo.draft.items
        )
      ) {
        options.setFieldError(
          RESERVATION_FORM_FIELD.ITEMS,
          RESERVATION_FORM_COPY[
            RESERVATION_FORM_FIELD.ITEMS
          ]
        );
        return;
      }
      options.submitCustomComboReservation(
        createCustomComboReservationInput({
          ...options.customCombo,
          durationHours: options.resolvedDurationHours,
          values: options.values,
        })
      );
      return;
    }
    if (setMissingConcreteUnitError(options)) {
      return;
    }
    options.submitReservation({
      ...options.values,
      durationHours: options.resolvedDurationHours,
    });
  };
