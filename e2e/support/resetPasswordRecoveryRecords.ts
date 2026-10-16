import {
  E2E_RECOVERY_TABLES,
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_FILTER,
} from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const resetPasswordRecoveryRecords =
  async (): Promise<void> => {
    const supabase = createServiceRoleClient();

    for (const table of E2E_RECOVERY_TABLES) {
      const { error } = await supabase
        .from(table)
        .delete()
        .not(
          E2E_SUPABASE_COLUMN.ID,
          E2E_SUPABASE_FILTER.IS,
          null
        );

      if (error) {
        failE2eOperation(
          "reset the password recovery records",
          error.message
        );
      }
    }
  };
