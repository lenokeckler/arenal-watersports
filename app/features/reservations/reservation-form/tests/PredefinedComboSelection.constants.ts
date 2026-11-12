import { PREDEFINED_COMBO_FORM_COPY } from "../constants/PredefinedComboFormCopy.constants";
import { PREDEFINED_COMBO_FORM_FIELD_ID } from "../constants/PredefinedComboForm.constants";

export const PREDEFINED_COMBO_SELECTION_TEST = {
  COPY: PREDEFINED_COMBO_FORM_COPY,
  FIELD_ID: PREDEFINED_COMBO_FORM_FIELD_ID,
  CUSTOMER_NAME: "Cliente de paquete predefinido",
  ITEM_COUNT_EXPECTED: "2 equipos",
  PRICE_TEXT: /₡25\s000,00/,
  SUCCESS_RESERVATION_ID:
    "cccccccc-0000-0000-0000-000000000001",
} as const;
