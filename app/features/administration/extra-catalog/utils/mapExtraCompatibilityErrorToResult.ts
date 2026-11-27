import type { PostgrestError } from "@supabase/supabase-js";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { EXTRA_COMPATIBILITY_COPY } from "../constants/ExtraCompatibilityCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { ExtraCompatibilityMutationResult } from "../models/ExtraCompatibilityMutationResult.interface";

const ERROR_CODE_MESSAGE: Record<string, string> = {
  [POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE]:
    EXTRA_COMPATIBILITY_COPY.FORBIDDEN_ERROR,
  [POSTGRES_ERROR_CODE.NO_DATA_FOUND]:
    EXTRA_COMPATIBILITY_COPY.NOT_FOUND_ERROR,
  [POSTGRES_ERROR_CODE.INVALID_PARAMETER_VALUE]:
    EXTRA_COMPATIBILITY_COPY.INVALID_INPUT_ERROR,
};

export const mapExtraCompatibilityErrorToResult = (
  error: NullableRef<PostgrestError>
): NullableRef<ExtraCompatibilityMutationResult> => {
  const message = error
    ? ERROR_CODE_MESSAGE[error.code]
    : undefined;

  return message
    ? { status: EXTRA_MUTATION_STATUS.ERROR, message }
    : null;
};
