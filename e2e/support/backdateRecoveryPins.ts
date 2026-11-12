import { E2E_RECOVERY_PIN_LIMITS } from "../constants/E2ePasswordRecoveryPin.constants";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";
import { readWorkerIdByUsername } from "./readWorkerIdByUsername";

export const backdateRecoveryPins = async (
  username: string,
  ageMs: number
): Promise<void> => {
  const createdAt = Date.now() - ageMs;
  const { error } = await createServiceRoleClient()
    .from(E2E_SUPABASE_TABLE.PASSWORD_RESET_PINS)
    .update({
      [E2E_SUPABASE_COLUMN.CREATED_AT]: new Date(
        createdAt
      ).toISOString(),
      [E2E_SUPABASE_COLUMN.EXPIRES_AT]: new Date(
        createdAt + E2E_RECOVERY_PIN_LIMITS.LIFETIME_MS
      ).toISOString(),
    })
    .eq(
      E2E_SUPABASE_COLUMN.WORKER_ID,
      await readWorkerIdByUsername(username)
    );

  if (error) {
    failE2eOperation(
      "backdate the recovery PINs",
      error.message
    );
  }
};
