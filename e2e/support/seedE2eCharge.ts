import type { SupabaseClient } from "@supabase/supabase-js";
import { buildE2eCustomerName } from "./buildE2eCustomerName";
import { buildE2ePaymentMethod } from "./buildE2ePaymentMethod";
import { insertE2eCharge } from "./insertE2eCharge";
import { insertE2eReservation } from "./insertE2eReservation";
import type { E2eChargeSeed } from "./models/E2eChargeSeed.interface";
import type { E2eSeededCharge } from "./models/E2eSeededCharge.interface";
import { removeE2eReservation } from "./removeE2eReservation";

export const seedE2eCharge = async (
  supabase: SupabaseClient,
  workerId: string,
  seed: E2eChargeSeed
): Promise<E2eSeededCharge> => {
  const paymentMethod = buildE2ePaymentMethod();
  const reservation = await insertE2eReservation(
    supabase,
    workerId,
    buildE2eCustomerName()
  );
  const charge = await insertE2eCharge(
    supabase,
    workerId,
    reservation.id,
    paymentMethod,
    seed
  ).catch(async (error: unknown) => {
    await removeE2eReservation(supabase, reservation.id);
    throw error;
  });

  return {
    ...seed,
    chargeId: charge.id,
    paymentMethod,
    reservationId: reservation.id,
  };
};
