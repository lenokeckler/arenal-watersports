import { COMBO_REMOVAL_OUTCOME } from "../constants/ComboRemovalOutcome.constants";

export type ComboRemovalOutcome =
  (typeof COMBO_REMOVAL_OUTCOME)[keyof typeof COMBO_REMOVAL_OUTCOME];
