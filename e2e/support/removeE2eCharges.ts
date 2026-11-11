import type { SupabaseClient } from "@supabase/supabase-js";
import {
  CHARGE_QUERY,
  SUPABASE_TABLE,
} from "@/app/constants";
import { E2E_CHARGE_ERROR } from "../constants/E2eDailyIncome.constants";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_ERROR,
} from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { E2eSeededCharge } from "./models/E2eSeededCharge.interface";

export const removeE2eCharges = async (
  supabase: SupabaseClient,
  seeded: readonly E2eSeededCharge[]
): Promise<void> => {
  const chargeIds = seeded.map(({ chargeId }) => chargeId);
  const reservationIds = seeded.map(
    ({ reservationId }) => reservationId
  );
  const { error: chargeError } = await supabase
    .from(CHARGE_QUERY.TABLE)
    .delete()
    .in(E2E_SUPABASE_COLUMN.ID, chargeIds);
  const { error: reservationError } = await supabase
    .from(SUPABASE_TABLE.RESERVATIONS)
    .delete()
    .in(E2E_SUPABASE_COLUMN.ID, reservationIds);
  const failures = [chargeError, reservationError]
    .filter((error) => error !== null)
    .map(({ message }) => message);

  if (failures.length > 0) {
    failE2eOperation(
      E2E_CHARGE_ERROR.OPERATION_REMOVE,
      failures.join(E2E_SUPABASE_ERROR.REASON_SEPARATOR)
    );
  }
};
