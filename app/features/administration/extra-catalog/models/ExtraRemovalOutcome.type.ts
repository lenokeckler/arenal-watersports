import { EXTRA_REMOVAL_OUTCOME } from "../constants/ExtraRemovalOutcome.constants";

export type ExtraRemovalOutcome =
  (typeof EXTRA_REMOVAL_OUTCOME)[keyof typeof EXTRA_REMOVAL_OUTCOME];
