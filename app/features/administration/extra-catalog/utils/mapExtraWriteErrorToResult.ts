import type { PostgrestError } from "@supabase/supabase-js";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";

export const mapExtraWriteErrorToResult = (
  error: NullableRef<PostgrestError>
): NullableRef<ExtraMutationResult> => {
  if (
    error?.code === POSTGRES_ERROR_CODE.UNIQUE_VIOLATION
  ) {
    return {
      status: EXTRA_MUTATION_STATUS.ERROR,
      nameError: EXTRA_CATALOG_COPY.NAME_DUPLICATE_ERROR,
    };
  }
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE
  ) {
    return {
      status: EXTRA_MUTATION_STATUS.ERROR,
      message: EXTRA_CATALOG_COPY.FORBIDDEN_ERROR,
    };
  }
  if (
    error?.code === POSTGRES_ERROR_CODE.NO_DATA_FOUND ||
    error?.code ===
      POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return {
      status: EXTRA_MUTATION_STATUS.ERROR,
      message: EXTRA_CATALOG_COPY.NOT_FOUND_ERROR,
    };
  }
  return null;
};
