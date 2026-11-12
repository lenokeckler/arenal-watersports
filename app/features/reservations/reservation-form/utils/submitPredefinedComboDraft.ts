import { PREDEFINED_COMBO_FORM_COPY } from "../constants/PredefinedComboFormCopy.constants";
import type { SubmitPredefinedComboDraftOptions } from "../models/SubmitPredefinedComboDraftOptions.interface";
import { createPredefinedComboReservationInput } from "./createPredefinedComboReservationInput";

export const submitPredefinedComboDraft = (
  options: SubmitPredefinedComboDraftOptions
): void => {
  const comboId = options.predefinedCombo.selectedComboId;
  if (!comboId) {
    options.setSubmissionError(
      PREDEFINED_COMBO_FORM_COPY.NO_SELECTION
    );
    options.requestErrorFocus();
    return;
  }

  options.submitPredefinedComboReservation(
    createPredefinedComboReservationInput({
      comboId,
      durationHours: options.durationHours,
      values: options.values,
    }),
    options.onSuccess
  );
};
