import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import { EXTRA_REMOVAL_OUTCOME_COPY } from "../constants/ExtraRemovalOutcomeCopy.constants";
import type { ExtraCardMutationResult } from "../models/ExtraCardMutationResult.interface";
import type { ExtraRemovalResult } from "../models/ExtraRemovalResult.type";

export const buildRemovalCardResult = (
  result: ExtraRemovalResult
): ExtraCardMutationResult =>
  result.status === EXTRA_MUTATION_STATUS.ERROR
    ? {
        message: result.message,
        status: EXTRA_MUTATION_STATUS.ERROR,
      }
    : {
        message: EXTRA_REMOVAL_OUTCOME_COPY[result.outcome],
        status: EXTRA_MUTATION_STATUS.SUCCESS,
      };
