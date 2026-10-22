import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";
import type { CreatePredefinedComboFormViewModelInput } from "../models/CreatePredefinedComboFormViewModelInput.interface";
import type { PredefinedComboFormViewModel } from "../models/PredefinedComboFormViewModel.interface";

export const createPredefinedComboFormViewModel = ({
  combos,
  handlers,
  isComboReservation,
  mode,
  selectedCombo,
  selectedComboId,
}: CreatePredefinedComboFormViewModelInput): PredefinedComboFormViewModel => ({
  combos: isComboReservation ? combos : [],
  hasGuideOnlyItem:
    selectedCombo?.items.some(
      ({ isGuideOnly }) => isGuideOnly
    ) ?? false,
  mode: isComboReservation
    ? mode
    : PREDEFINED_COMBO_SELECTION_MODE.CUSTOM,
  selectedCombo:
    isComboReservation &&
    mode === PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED
      ? selectedCombo
      : null,
  selectedComboId: isComboReservation
    ? selectedComboId
    : null,
  ...handlers,
});
