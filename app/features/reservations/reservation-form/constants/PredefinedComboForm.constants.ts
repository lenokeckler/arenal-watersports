import { PREDEFINED_COMBO_FORM_COPY } from "./PredefinedComboFormCopy.constants";
import { PREDEFINED_COMBO_SELECTION_MODE } from "./PredefinedComboSelectionMode.constants";

export const PREDEFINED_COMBO_FORM_FIELD_ID = {
  MODE_CUSTOM: "predefined-combo-mode-custom",
  MODE_PREDEFINED: "predefined-combo-mode-predefined",
  SELECT: "predefined-combo-select",
} as const;

export const PREDEFINED_COMBO_MODE_OPTIONS = [
  {
    id: PREDEFINED_COMBO_FORM_FIELD_ID.MODE_CUSTOM,
    label: PREDEFINED_COMBO_FORM_COPY.CUSTOM_MODE,
    value: PREDEFINED_COMBO_SELECTION_MODE.CUSTOM,
  },
  {
    id: PREDEFINED_COMBO_FORM_FIELD_ID.MODE_PREDEFINED,
    label: PREDEFINED_COMBO_FORM_COPY.PREDEFINED_MODE,
    value: PREDEFINED_COMBO_SELECTION_MODE.PREDEFINED,
  },
] as const;
