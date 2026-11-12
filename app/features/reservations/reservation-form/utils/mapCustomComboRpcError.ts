import type { PostgrestError } from "@supabase/supabase-js";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { CUSTOM_COMBO_DATABASE_MESSAGE } from "../constants/CustomComboDatabaseMessage.constants";
import { CUSTOM_COMBO_RPC_ERROR_COPY } from "../constants/CustomComboRpcErrorCopy.constants";
import type { CustomComboReservationFieldError } from "../models/CustomComboReservationFieldError.interface";

const isPostgrestError = (
  value: unknown
): value is PostgrestError =>
  typeof value === "object" &&
  value !== null &&
  "code" in value &&
  typeof value.code === "string" &&
  "message" in value &&
  typeof value.message === "string";

export const isCustomComboMissingTariffError = (
  error: unknown
): boolean => {
  if (!(error instanceof SupabaseQueryError)) {
    return false;
  }

  const cause = error.cause;
  return (
    isPostgrestError(cause) &&
    cause.code === POSTGRES_ERROR_CODE.RAISE_EXCEPTION &&
    cause.message ===
      CUSTOM_COMBO_DATABASE_MESSAGE.TARIFF_MISSING
  );
};

export const mapCustomComboRpcError = (
  error: unknown
): NullableRef<CustomComboReservationFieldError> => {
  if (!(error instanceof SupabaseQueryError)) {
    return null;
  }

  const cause = error.cause;
  if (
    !isPostgrestError(cause) ||
    cause.code !== POSTGRES_ERROR_CODE.RAISE_EXCEPTION
  ) {
    return null;
  }

  return CUSTOM_COMBO_RPC_ERROR_COPY[cause.message] ?? null;
};
