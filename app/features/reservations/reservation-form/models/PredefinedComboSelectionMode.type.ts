import { PREDEFINED_COMBO_SELECTION_MODE } from "../constants/PredefinedComboSelectionMode.constants";

export type PredefinedComboSelectionMode =
  (typeof PREDEFINED_COMBO_SELECTION_MODE)[keyof typeof PREDEFINED_COMBO_SELECTION_MODE];
