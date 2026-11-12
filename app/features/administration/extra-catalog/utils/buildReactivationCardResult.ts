import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { ExtraCardMutationResult } from "../models/ExtraCardMutationResult.interface";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";

export const buildReactivationCardResult = (
  result: ExtraMutationResult
): ExtraCardMutationResult =>
  result.status === EXTRA_MUTATION_STATUS.ERROR
    ? {
        message:
          result.message ??
          EXTRA_CATALOG_COPY.REACTIVATE_GENERIC_ERROR,
        status: EXTRA_MUTATION_STATUS.ERROR,
      }
    : {
        message:
          EXTRA_CATALOG_COPY.REACTIVATE_SUCCESS_TOAST,
        status: EXTRA_MUTATION_STATUS.SUCCESS,
      };
