import type { ExtraRemovalOutcome } from "../models/ExtraRemovalOutcome.type";
import { EXTRA_REMOVAL_OUTCOME } from "./ExtraRemovalOutcome.constants";

export const EXTRA_REMOVAL_OUTCOME_COPY: Record<
  ExtraRemovalOutcome,
  string
> = {
  [EXTRA_REMOVAL_OUTCOME.DEACTIVATED]:
    "Este extra ya se usó en reservas, así que se marcó como inactivo y se conserva su historial.",
  [EXTRA_REMOVAL_OUTCOME.DELETED]: "Extra eliminado.",
};
