import type { ReservationFormCustomComboViewModelOptions } from "../models/ReservationFormCustomComboViewModelOptions.interface";
import { useCustomComboForm } from "./useCustomComboForm";
import { createReservationFormSubmitHandler } from "../utils/createReservationFormSubmitHandler";

export const useReservationFormCustomComboViewModel = (
  options: ReservationFormCustomComboViewModelOptions
) => {
  const customCombo = useCustomComboForm(options);
  const handleSubmit = createReservationFormSubmitHandler({
    requiresConcreteUnit: options.requiresConcreteUnit,
    resolvedDurationHours: options.durationHours,
    setFieldError: options.setFieldError,
    submitReservation: options.submitReservation,
    submitCustomComboReservation:
      options.submitCustomComboReservation,
    customCombo: {
      draft: customCombo.draft,
      hasGuideOnlyItem: customCombo.hasGuideOnlyItem,
    },
    values: options.values,
  });
  return { customCombo, handleSubmit };
};
