import type { SupabaseClient } from "@supabase/supabase-js";
import {
  CHARGE_QUERY,
  REFUND_QUERY,
} from "@/app/constants";
import {
  E2E_INCOME_ERROR,
  E2E_INCOME_TABLE,
} from "../constants/E2eIncome.constants";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_ERROR,
} from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { E2eIncomeMovements } from "./models/E2eIncomeMovements.interface";

export const removeIncomeMovements = async (
  supabase: SupabaseClient,
  {
    chargeIds,
    refundIds,
    reservationId,
  }: E2eIncomeMovements
): Promise<void> => {
  const { error: refundError } = await supabase
    .from(REFUND_QUERY.TABLE)
    .delete()
    .in(E2E_SUPABASE_COLUMN.ID, refundIds);
  const { error: chargeError } = await supabase
    .from(CHARGE_QUERY.TABLE)
    .delete()
    .in(E2E_SUPABASE_COLUMN.ID, chargeIds);
  const { error: reservationError } = await supabase
    .from(E2E_INCOME_TABLE.RESERVATIONS)
    .delete()
    .eq(E2E_SUPABASE_COLUMN.ID, reservationId);
  const failures = [
    refundError,
    chargeError,
    reservationError,
  ]
    .filter((error) => error !== null)
    .map(({ message }) => message);

  if (failures.length > 0) {
    failE2eOperation(
      E2E_INCOME_ERROR.REMOVE,
      failures.join(E2E_SUPABASE_ERROR.REASON_SEPARATOR)
    );
  }
};
