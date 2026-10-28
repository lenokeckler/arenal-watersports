import type { SupabaseClient } from "@supabase/supabase-js";
import { buildE2eCustomerName } from "./buildE2eCustomerName";
import { insertE2eDeposit } from "./insertE2eDeposit";
import { insertE2eReservation } from "./insertE2eReservation";
import type { E2eDepositSeed } from "./models/E2eDepositSeed.interface";
import type { E2eSeededDeposit } from "./models/E2eSeededDeposit.interface";
import { removeE2eReservation } from "./removeE2eReservation";

export const seedE2eDeposit = async (
  supabase: SupabaseClient,
  workerId: string,
  seed: E2eDepositSeed
): Promise<E2eSeededDeposit> => {
  const customerName = buildE2eCustomerName();
  const reservation = await insertE2eReservation(
    supabase,
    workerId,
    customerName
  );
  const deposit = await insertE2eDeposit(
    supabase,
    workerId,
    reservation.id,
    seed
  ).catch(async (error: unknown) => {
    await removeE2eReservation(supabase, reservation.id);
    throw error;
  });

  return {
    ...seed,
    customerName,
    depositId: deposit.id,
    reservationCode: reservation.code,
    reservationId: reservation.id,
  };
};
