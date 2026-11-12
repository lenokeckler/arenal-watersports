import { STRING, TYPE_OF } from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";

const isObject = (value: unknown): value is object =>
  typeof value === TYPE_OF.OBJECT && value !== null;

export const resolveReservationPostponementErrorDetail = (
  error: Error
): string => {
  if (!(error instanceof SupabaseQueryError)) {
    return STRING.Empty;
  }

  const cause: unknown = error.cause;

  return isObject(cause) &&
    "details" in cause &&
    typeof cause.details === TYPE_OF.STRING
    ? `${cause.details}`
    : STRING.Empty;
};
