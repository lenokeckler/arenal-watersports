import { COMBO_CATALOG_DIAGNOSTICS } from "../constants/ComboCatalogDiagnostics.constants";
import { COMBO_REMOVAL_OUTCOME } from "../constants/ComboRemovalOutcome.constants";
import type { ComboRemovalOutcome } from "../models/ComboRemovalOutcome.type";

const KNOWN_OUTCOMES: readonly string[] = Object.values(
  COMBO_REMOVAL_OUTCOME
);

const isComboRemovalOutcome = (
  returned: string
): returned is ComboRemovalOutcome =>
  KNOWN_OUTCOMES.includes(returned);

export const parseComboRemovalOutcome = (
  returned: string
): ComboRemovalOutcome => {
  if (!isComboRemovalOutcome(returned)) {
    throw new Error(
      COMBO_CATALOG_DIAGNOSTICS.UNKNOWN_REMOVAL_OUTCOME,
      { cause: returned }
    );
  }
  return returned;
};
