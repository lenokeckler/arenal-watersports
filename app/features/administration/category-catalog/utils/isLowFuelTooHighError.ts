import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";
import { LOW_FUEL_LINES_DATABASE_ERROR } from "../constants/CategoryBehaviorValidation.constants";

export const isLowFuelTooHighError = (
  error: unknown
): boolean =>
  error instanceof SupabaseQueryError &&
  error.message.includes(
    LOW_FUEL_LINES_DATABASE_ERROR.TOO_HIGH_MESSAGE
  );
