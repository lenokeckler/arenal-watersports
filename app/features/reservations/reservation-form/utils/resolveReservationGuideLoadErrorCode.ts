import { RESERVATION_GUIDE_LOAD_ERROR_CODE } from "../constants/ReservationGuideLoad.constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";

export const resolveReservationGuideLoadErrorCode = (
  error: unknown
): string => {
  if (error instanceof SupabaseQueryError) {
    const cause = error.cause;
    if (
      typeof cause === "object" &&
      cause !== null &&
      "code" in cause &&
      typeof cause.code === "string"
    ) {
      return cause.code;
    }
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }
  if (error instanceof Error) {
    return error.name;
  }
  return RESERVATION_GUIDE_LOAD_ERROR_CODE.UNKNOWN;
};
