import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_DEPOSIT_COLUMN,
  E2E_DEPOSIT_ERROR,
  E2E_DEPOSIT_TABLE,
} from "../constants/E2ePendingDeposits.constants";
import { E2E_SUPABASE_ERROR } from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { E2eSeededDeposit } from "./models/E2eSeededDeposit.interface";

export const removeE2eDeposits = async (
  supabase: SupabaseClient,
  seeded: readonly E2eSeededDeposit[]
): Promise<void> => {
  const depositIds = seeded.map(
    ({ depositId }) => depositId
  );
  const reservationIds = seeded.map(
    ({ reservationId }) => reservationId
  );
  const { error: depositError } = await supabase
    .from(E2E_DEPOSIT_TABLE.DEPOSITS)
    .delete()
    .in(E2E_DEPOSIT_COLUMN.ID, depositIds);
  const { error: reservationError } = await supabase
    .from(E2E_DEPOSIT_TABLE.RESERVATIONS)
    .delete()
    .in(E2E_DEPOSIT_COLUMN.ID, reservationIds);
  const failures = [depositError, reservationError]
    .filter((error) => error !== null)
    .map(({ message }) => message);

  if (failures.length > 0) {
    failE2eOperation(
      E2E_DEPOSIT_ERROR.OPERATION_REMOVE,
      failures.join(E2E_SUPABASE_ERROR.REASON_SEPARATOR)
    );
  }
};
