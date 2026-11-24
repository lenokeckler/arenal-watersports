import { STRING } from "@/app/constants";
import type { ComboFormValues } from "../models/ComboFormValues.interface";
import { COMBO_AUDIENCE } from "./ComboAudience.constants";

export const DEFAULT_COMBO_FORM_VALUES: ComboFormValues = {
  audience: COMBO_AUDIENCE.NATIONAL,
  items: [],
  name: STRING.Empty,
  priceText: STRING.Empty,
};
