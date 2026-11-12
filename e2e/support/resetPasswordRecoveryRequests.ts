import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_FILTER,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const resetPasswordRecoveryRequests =
  async (): Promise<void> => {
    const { error } = await createServiceRoleClient()
      .from(E2E_SUPABASE_TABLE.PASSWORD_RESET_REQUESTS)
      .delete()
      .not(
        E2E_SUPABASE_COLUMN.ID,
        E2E_SUPABASE_FILTER.IS,
        null
      );

    if (error) {
      failE2eOperation(
        "reset the password recovery requests",
        error.message
      );
    }
  };
