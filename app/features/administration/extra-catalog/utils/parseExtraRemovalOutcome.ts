import { EXTRA_REMOVAL_DIAGNOSTICS } from "../constants/ExtraRemovalDiagnostics.constants";
import { EXTRA_REMOVAL_OUTCOME } from "../constants/ExtraRemovalOutcome.constants";
import type { ExtraRemovalOutcome } from "../models/ExtraRemovalOutcome.type";

const KNOWN_OUTCOMES: readonly string[] = Object.values(
  EXTRA_REMOVAL_OUTCOME
);

const isExtraRemovalOutcome = (
  returned: string
): returned is ExtraRemovalOutcome =>
  KNOWN_OUTCOMES.includes(returned);

export const parseExtraRemovalOutcome = (
  returned: string
): ExtraRemovalOutcome => {
  if (!isExtraRemovalOutcome(returned)) {
    throw new Error(
      EXTRA_REMOVAL_DIAGNOSTICS.UNKNOWN_OUTCOME,
      {
        cause: returned,
      }
    );
  }
  return returned;
};
