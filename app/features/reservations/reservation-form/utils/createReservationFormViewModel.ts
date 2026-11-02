import type { ReservationFormViewModel } from "../models/ReservationFormViewModel.interface";
import type { useReservationFormViewModelData } from "../hooks/useReservationFormViewModelData";
import type { useReservationFormEquipmentSelection } from "../hooks/useReservationFormEquipmentSelection";
import type { useReservationFormViewModelActions } from "../hooks/useReservationFormViewModelActions";

export const createReservationFormViewModel = (
  data: ReturnType<typeof useReservationFormViewModelData>,
  selection: ReturnType<
    typeof useReservationFormEquipmentSelection
  >,
  actions: ReturnType<
    typeof useReservationFormViewModelActions
  >,
  handleBack: () => void
): ReservationFormViewModel => ({
  categories: data.eligibility.categories,
  ...data.state.fields,
  ...data.state.submission,
  ...data.state.duration,
  ...data.equipment,
  ...data.state.durationHandlers,
  isSubmitDisabled: actions.isSubmitDisabled,
  handleBack,
  handleCategoryChange: selection.handleCategoryChange,
  handleUnitChange: selection.handleUnitChange,
  handleRetryEquipmentEligibility: data.eligibility.retry,
  handleSubmit: actions.handleSubmit,
  hasEquipmentEligibilityError: data.eligibility.hasError,
  hasEquipmentSelectionChanged: selection.hasChanged,
  isEquipmentEligibilityLoading: data.eligibility.isLoading,
});
