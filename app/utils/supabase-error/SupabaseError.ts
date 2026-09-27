import type { PostgrestError } from "@supabase/supabase-js";

export class SupabaseQueryError extends Error {
  constructor(operation: string, cause: PostgrestError) {
    super(
      `Supabase query failed: ${operation} — ${cause.message} (${cause.code})`
    );
    this.name = "SupabaseQueryError";
    this.cause = cause;
  }
}

export const throwIfSupabaseError = (
  error: PostgrestError | null,
  operation: string
): void => {
  if (error) {
    throw new SupabaseQueryError(operation, error);
  }
};
