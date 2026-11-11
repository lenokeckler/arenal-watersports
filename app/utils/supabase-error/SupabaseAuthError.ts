import type { AuthError } from "@supabase/supabase-js";

export class SupabaseAuthOperationError extends Error {
  constructor(operation: string, cause: AuthError) {
    super(`Supabase auth operation failed: ${operation}`);
    this.name = "SupabaseAuthOperationError";
    this.cause = cause;
  }
}

export const throwIfSupabaseAuthError = (
  error: AuthError | null,
  operation: string
): void => {
  if (error) {
    throw new SupabaseAuthOperationError(operation, error);
  }
};
