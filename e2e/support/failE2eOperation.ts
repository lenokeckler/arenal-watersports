import { E2E_SUPABASE_ERROR } from "../constants/E2eSupabase.constants";

export const failE2eOperation = (
  operation: string,
  reason: string
): never => {
  throw new Error(
    E2E_SUPABASE_ERROR.OPERATION_FAILED(operation, reason)
  );
};
