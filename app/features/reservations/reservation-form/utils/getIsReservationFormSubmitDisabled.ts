import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";
import type { ReservationFormCardProps } from "../models/ReservationFormCardProps.interface";

export const getIsReservationFormSubmitDisabled = ({
  categories,
  viewModel,
}: ReservationFormCardProps): boolean => {
  const hasSelectedPredefinedCombo =
    viewModel.predefinedCombo.mode ===
      PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED &&
    viewModel.predefinedCombo.selectedCombo;
  const isAvailabilityUnavailable =
    viewModel.requiresConcreteUnit &&
    (viewModel.availableUnits.length === 0 ||
      viewModel.isAvailabilityLoading ||
      viewModel.hasAvailabilityError);

  return (
    viewModel.isPending ||
    (categories.length === 0 &&
      !hasSelectedPredefinedCombo) ||
    viewModel.isEquipmentEligibilityLoading ||
    viewModel.hasEquipmentEligibilityError ||
    isAvailabilityUnavailable
  );
};
