import type { ReservationFormSubmitOptions } from "../models/ReservationFormSubmitOptions.interface";
import type { CreateReservationFormSubmitOptionsInput } from "../models/CreateReservationFormSubmitOptionsInput.interface";

export const createReservationFormSubmitOptions = ({
  dependencies,
  customCombo,
  predefinedCombo,
}: CreateReservationFormSubmitOptionsInput): ReservationFormSubmitOptions => {
  const { resources } = dependencies;
  const { state } = resources;

  return {
    ...resources.equipment,
    predefinedCombo,
    customCombo: {
      draft: customCombo.draft,
      hasGuideOnlyItem: customCombo.hasGuideOnlyItem,
    },
    resolvedDurationHours: resources.resolvedDurationHours,
    setFieldError: state.submission.setFieldError,
    submitCustomComboReservation:
      state.submission.submitCustomComboReservation,
    submitPredefinedComboReservation:
      state.submission.submitPredefinedComboReservation,
    setSubmissionError: state.submission.setSubmissionError,
    submitReservation: state.submission.submitReservation,
    values: state.fields.values,
  };
};
