import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import type { ReservationMoneyMovementsCreatedAt } from "../models/ReservationMoneyMovementsCreatedAt.interface";
import { insertReservationMoneyMovements } from "./insertReservationMoneyMovements";

export const seedReservationMoneyMovements = async (
  reservationId: string
): Promise<ReservationMoneyMovementsCreatedAt> => {
  const supabase = createServiceRoleSupabaseClient();
  try {
    return await insertReservationMoneyMovements(
      supabase,
      reservationId
    );
  } finally {
    await supabase.removeAllChannels();
  }
};
