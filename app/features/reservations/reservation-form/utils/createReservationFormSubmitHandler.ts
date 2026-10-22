import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import type { ReservationFormSubmitOptions } from "../models/ReservationFormSubmitOptions.interface";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_COPY } from "../constants/ReservationFormCopy.constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { hasValidCustomComboEquipmentSelections } from "./hasValidCustomComboEquipmentSelections";
import { createCustomComboReservationInput } from "./createCustomComboReservationInput";
import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";
import { PREDEFINED_COMBO_FORM_COPY } from "../constants/PredefinedComboFormCopy.constants";
import { createPredefinedComboReservationInput } from "./createPredefinedComboReservationInput";

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

const submitPredefinedCombo = (
  options: ReservationFormSubmitOptions
): void => {
  const comboId = options.predefinedCombo.selectedComboId;
  if (!comboId) {
    options.setSubmissionError(
      PREDEFINED_COMBO_FORM_COPY.NO_SELECTION
    );
    return;
  }
  options.submitPredefinedComboReservation(
    createPredefinedComboReservationInput({
      comboId,
      durationHours: options.resolvedDurationHours,
      values: options.values,
    })
  );
};

const submitCustomCombo = (
  options: ReservationFormSubmitOptions
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
    return;
  }
  options.submitCustomComboReservation(
    createCustomComboReservationInput({
      ...options.customCombo,
      durationHours: options.resolvedDurationHours,
      values: options.values,
    })
  );
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
        options.predefinedCombo.mode ===
        PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED
      ) {
        submitPredefinedCombo(options);
        return;
      }
      submitCustomCombo(options);
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
