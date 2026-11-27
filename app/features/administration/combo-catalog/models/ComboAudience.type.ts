import { COMBO_AUDIENCE } from "../constants/ComboAudience.constants";

export type ComboAudience =
  (typeof COMBO_AUDIENCE)[keyof typeof COMBO_AUDIENCE];
