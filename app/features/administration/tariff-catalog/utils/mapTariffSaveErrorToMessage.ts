import type { PostgrestError } from "@supabase/supabase-js";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { TARIFF_FORM_COPY } from "../constants/TariffFormCopy.constants";

export const mapTariffSaveErrorToMessage = (
  error: NullableRef<PostgrestError>
): NullableRef<string> => {
  switch (error?.code) {
    case POSTGRES_ERROR_CODE.INVALID_PARAMETER_VALUE:
      return error.message;
    case POSTGRES_ERROR_CODE.OBJECT_NOT_IN_PREREQUISITE_STATE:
      return TARIFF_FORM_COPY.REMOVE_TARIFF_ERROR;
    case POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE:
      return TARIFF_FORM_COPY.FORBIDDEN_ERROR;
    default:
      return null;
  }
};
