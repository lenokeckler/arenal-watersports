import type { ReservationFormViewModelCompositionOptions } from "../models/ReservationFormViewModelCompositionOptions.interface";
import type { ReservationGuideAssignmentViewModel } from "../models/ReservationGuideAssignmentViewModel.interface";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { useReservationFormCustomComboViewModel } from "./useReservationFormCustomComboViewModel";
import { useReservationGuideAssignmentState } from "./useReservationGuideAssignmentState";

export const useReservationFormViewModelComposition = ({
  guideLoadResult,
  handleBack,
  resources,
}: ReservationFormViewModelCompositionOptions): ReservationGuideAssignmentViewModel => {
  const { state, equipment, resolvedDurationHours } =
    resources;
  const guideLoad = useReservationGuideAssignmentState(
    state.fields.reconcileGuideSelection,
    guideLoadResult
  );
  const { customCombo, handleSubmit } =
    useReservationFormCustomComboViewModel({
      categories: equipment.categories,
      clearFieldError: state.submission.clearFieldError,
      durationHours: resolvedDurationHours,
      onGuideIdsChange: state.fields.handleGuideIdsChange,
      reservationType:
        state.fields.values.reservationType ??
        RESERVATION_TYPE.RENTAL,
      requiresConcreteUnit: equipment.requiresConcreteUnit,
      setFieldError: state.submission.setFieldError,
      submitCustomComboReservation:
        state.submission.submitCustomComboReservation,
      submitReservation: state.submission.submitReservation,
      values: state.fields.values,
    });
  return {
    ...state.fields,
    ...state.submission,
    ...state.duration,
    ...state.durationHandlers,
    ...equipment,
    customCombo,
    resolvedDurationHours,
    handleBack,
    handleSubmit,
    guideLoadResult: guideLoad.result,
    isGuideLoading: guideLoad.isLoading,
    handleRetryGuideLoading: guideLoad.retry,
  };
};
