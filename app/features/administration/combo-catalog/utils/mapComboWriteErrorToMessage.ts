import type { PostgrestError } from "@supabase/supabase-js";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";

export const mapComboWriteErrorToMessage = (
  error: NullableRef<PostgrestError>
): NullableRef<string> => {
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE
  ) {
    return COMBO_CATALOG_COPY.FORBIDDEN_ERROR;
  }
  if (
    error?.code === POSTGRES_ERROR_CODE.NO_DATA_FOUND ||
    error?.code ===
      POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return COMBO_CATALOG_COPY.NOT_FOUND_ERROR;
  }
  return null;
};
