import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { ExtraRemovalOutcome } from "./ExtraRemovalOutcome.type";

export type ExtraRemovalResult =
  | {
      status: typeof EXTRA_MUTATION_STATUS.SUCCESS;
      outcome: ExtraRemovalOutcome;
    }
  | {
      status: typeof EXTRA_MUTATION_STATUS.ERROR;
      message: string;
    };
