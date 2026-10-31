import type { PostgrestError } from "@supabase/supabase-js";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { UNIT_DATABASE_MESSAGE } from "../constants/UnitDatabaseMessage.constants";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import type { UnitMutationResult } from "../models/UnitMutationResult.interface";

export const mapUnitWriteErrorToResult = (
  error: NullableRef<PostgrestError>
): NullableRef<UnitMutationResult> => {
  if (
    error?.code === POSTGRES_ERROR_CODE.UNIQUE_VIOLATION
  ) {
    return {
      status: UNIT_MUTATION_STATUS.ERROR,
      codeError: UNIT_CATALOG_COPY.CODE_DUPLICATE_ERROR,
    };
  }
  if (
    error?.code === POSTGRES_ERROR_CODE.RAISE_EXCEPTION &&
    error.message ===
      UNIT_DATABASE_MESSAGE.CATEGORY_NOT_BY_UNIT
  ) {
    return {
      status: UNIT_MUTATION_STATUS.ERROR,
      message: UNIT_CATALOG_COPY.CATEGORY_NOT_BY_UNIT_ERROR,
    };
  }
  return null;
};
