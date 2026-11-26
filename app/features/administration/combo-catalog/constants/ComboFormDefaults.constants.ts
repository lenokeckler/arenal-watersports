import { STRING } from "@/app/constants";
import type { ComboFormErrors } from "../models/ComboFormErrors.interface";
import type { ComboFormItemValues } from "../models/ComboFormItemValues.interface";
import type { ComboFormValues } from "../models/ComboFormValues.interface";
import { COMBO_AUDIENCE } from "./ComboAudience.constants";

export const DEFAULT_COMBO_FORM_VALUES: ComboFormValues = {
  audience: COMBO_AUDIENCE.NATIONAL,
  items: [],
  name: STRING.Empty,
  priceText: STRING.Empty,
};

export const EMPTY_COMBO_FORM_ITEM: ComboFormItemValues = {
  categoryId: STRING.Empty,
  quantityText: STRING.Empty,
};

export const INITIAL_COMBO_FORM_VALUES: ComboFormValues = {
  ...DEFAULT_COMBO_FORM_VALUES,
  items: [EMPTY_COMBO_FORM_ITEM],
};

export const NO_COMBO_FORM_ERRORS: ComboFormErrors = {
  count: 0,
  itemErrors: [],
};
