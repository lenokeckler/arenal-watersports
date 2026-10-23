import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationGuideAssignmentViewModel } from "../models/ReservationGuideAssignmentViewModel.interface";
import type { ReservationFormViewModelComposition } from "../models/ReservationFormViewModelComposition.interface";
import { filterReservationCategoriesByType } from "./filterReservationCategoriesByType";

export const createReservationFormViewModel = ({
  dependencies,
  guideLoad,
  customCombo,
  predefinedCombo,
  handleSubmit,
  handleReservationTypeChange,
}: ReservationFormViewModelComposition): ReservationGuideAssignmentViewModel => {
  const { handlers, resources, router } = dependencies;
  const { state, eligibility } = resources;

  return {
    categories: filterReservationCategoriesByType(
      eligibility.categories,
      state.fields.values.reservationType ??
        RESERVATION_TYPE.RENTAL
    ),
    ...state.fields,
    ...state.submission,
    ...state.duration,
    ...resources.equipment,
    customCombo,
    predefinedCombo,
    extras: resources.extras,
    ...state.durationHandlers,
    ...handlers,
    handleBack: router.back,
    handleReservationTypeChange,
    handleGuideToggle: state.fields.handleGuideToggle,
    handleExtraToggle: state.fields.handleExtraToggle,
    handleRetryEquipmentEligibility: eligibility.retry,
    handleSubmit,
    hasEquipmentEligibilityError: eligibility.hasError,
    hasEquipmentSelectionChanged:
      resources.hasEquipmentSelectionChanged,
    isEquipmentEligibilityLoading: eligibility.isLoading,
    guideLoadResult: guideLoad.result,
    isGuideLoading: guideLoad.isLoading,
    handleRetryGuideLoading: guideLoad.retry,
  };
};
