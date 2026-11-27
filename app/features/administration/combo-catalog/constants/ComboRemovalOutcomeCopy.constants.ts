import type { ComboRemovalOutcome } from "../models/ComboRemovalOutcome.type";
import { COMBO_REMOVAL_OUTCOME } from "./ComboRemovalOutcome.constants";

export const COMBO_REMOVAL_OUTCOME_COPY: Record<
  ComboRemovalOutcome,
  string
> = {
  [COMBO_REMOVAL_OUTCOME.DEACTIVATED]:
    "Combo marcado inactivo porque ya se vendió.",
  [COMBO_REMOVAL_OUTCOME.DELETED]: "Combo eliminado.",
};
