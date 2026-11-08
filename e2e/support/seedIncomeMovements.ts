import type { SupabaseClient } from "@supabase/supabase-js";
import {
  CHARGE_QUERY,
  REFUND_QUERY,
} from "@/app/constants";
import {
  E2E_INCOME_CHARGE,
  E2E_INCOME_ERROR,
  E2E_INCOME_REFUND_REASON,
  E2E_INCOME_SEEDS,
} from "../constants/E2eIncome.constants";
import { insertIncomeMovement } from "./insertIncomeMovement";
import { insertIncomeReservation } from "./insertIncomeReservation";
import type { E2eIncomeMovements } from "./models/E2eIncomeMovements.interface";
import { removeIncomeMovements } from "./removeIncomeMovements";

export const seedIncomeMovements = async (
  supabase: SupabaseClient,
  workerId: string
): Promise<E2eIncomeMovements> => {
  const movements: E2eIncomeMovements = {
    reservationId: await insertIncomeReservation(
      supabase,
      workerId
    ),
    chargeIds: [],
    refundIds: [],
  };
  const base = {
    created_by: workerId,
    reservation_id: movements.reservationId,
  };

  try {
    for (const seed of [
      E2E_INCOME_SEEDS.USD_CHARGE,
      E2E_INCOME_SEEDS.CRC_CHARGE,
    ]) {
      movements.chargeIds.push(
        await insertIncomeMovement(
          supabase,
          CHARGE_QUERY.TABLE,
          {
            ...base,
            ...seed,
            kind: E2E_INCOME_CHARGE.KIND,
            payment_method:
              E2E_INCOME_CHARGE.PAYMENT_METHOD,
          },
          E2E_INCOME_ERROR.INSERT_CHARGE
        )
      );
    }
    movements.refundIds.push(
      await insertIncomeMovement(
        supabase,
        REFUND_QUERY.TABLE,
        {
          ...base,
          ...E2E_INCOME_SEEDS.CRC_REFUND,
          reason: E2E_INCOME_REFUND_REASON,
        },
        E2E_INCOME_ERROR.INSERT_REFUND
      )
    );
  } catch (error) {
    await removeIncomeMovements(supabase, movements).catch(
      (cleanupError: unknown) => {
        throw new AggregateError(
          [error, cleanupError],
          E2E_INCOME_ERROR.SEED
        );
      }
    );
    throw error;
  }

  return movements;
};
