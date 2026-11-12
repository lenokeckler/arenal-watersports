import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_COUNT,
  E2E_SUPABASE_FILTER,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { E2E_PIN_CONSUMPTION_ERROR } from "../constants/E2ePasswordRecoveryReset.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

export const countSpentRecoveryPins = async (
  workerId: string
): Promise<number> => {
  const { count, error } = await createServiceRoleClient()
    .from(E2E_SUPABASE_TABLE.PASSWORD_RESET_PINS)
    .select(E2E_SUPABASE_COLUMN.ID, {
      count: E2E_SUPABASE_COUNT.EXACT,
      head: true,
    })
    .eq(E2E_SUPABASE_COLUMN.WORKER_ID, workerId)
    .not(
      E2E_SUPABASE_COLUMN.USED_AT,
      E2E_SUPABASE_FILTER.IS,
      null
    );

  if (error || count === null) {
    return failE2eOperation(
      E2E_PIN_CONSUMPTION_ERROR.SPENT_COUNT_OPERATION,
      error?.message ?? E2E_PIN_CONSUMPTION_ERROR.NO_COUNT
    );
  }

  return count;
};
