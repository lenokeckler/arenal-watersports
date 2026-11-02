import type { useReservationFormViewModelData } from "./useReservationFormViewModelData";
import { createReservationFormSubmitHandler } from "../utils/createReservationFormSubmitHandler";

export const useReservationFormViewModelActions = (
  data: ReturnType<typeof useReservationFormViewModelData>
) => {
  const {
    equipment,
    eligibleCategories,
    resolvedDurationHours,
    state,
  } = data;
  const submitOptions = {
    ...equipment,
    resolvedDurationHours,
    setFieldError: () => undefined,
    submitReservation: (
      input: Parameters<
        typeof state.submission.submitReservation
      >[0]
    ) =>
      state.submission.submitReservation(
        input,
        () => undefined
      ),
    values: state.fields.values,
  };
  const isAvailabilityUnavailable =
    submitOptions.requiresConcreteUnit &&
    equipment.availableUnits.length === 0;

  return {
    handleSubmit:
      createReservationFormSubmitHandler(submitOptions),
    isSubmitDisabled:
      state.submission.isPending ||
      eligibleCategories.length === 0 ||
      isAvailabilityUnavailable,
  };
};
