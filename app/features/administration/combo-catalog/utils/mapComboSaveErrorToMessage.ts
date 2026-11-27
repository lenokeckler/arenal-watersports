import type { PostgrestError } from "@supabase/supabase-js";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { COMBO_FORM_COPY } from "../constants/ComboFormCopy.constants";
import { mapComboWriteErrorToMessage } from "./mapComboWriteErrorToMessage";

export const mapComboSaveErrorToMessage = (
  error: NullableRef<PostgrestError>
): NullableRef<string> => {
  switch (error?.code) {
    case POSTGRES_ERROR_CODE.INVALID_PARAMETER_VALUE:
      return error.message;
    case POSTGRES_ERROR_CODE.OBJECT_NOT_IN_PREREQUISITE_STATE:
      return COMBO_FORM_COPY.SOLD_COMBO_LOCKED_ERROR;
    case POSTGRES_ERROR_CODE.NO_DATA_FOUND:
      return COMBO_FORM_COPY.NOT_FOUND_ERROR;
    case POSTGRES_ERROR_CODE.UNIQUE_VIOLATION:
      return COMBO_FORM_COPY.NAME_DUPLICATE_ERROR;
    default:
      return mapComboWriteErrorToMessage(error);
  }
};
