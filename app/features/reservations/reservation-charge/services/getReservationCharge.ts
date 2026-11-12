import { UUID_PATTERN } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { isReservationChargeable } from "@/app/utils/reservations/isReservationChargeable";
import { RESERVATION_CHARGE_NO_PROPOSAL } from "../constants/ReservationChargeNoProposal.constants";
import type { ReservationCharge } from "../models/ReservationCharge.interface";
import { mapReservationCharge } from "../utils/mapReservationCharge";
import { readReservationChargeProposal } from "./readReservationChargeProposal";
import { readReservationChargeRow } from "./readReservationChargeRow";

export const getReservationCharge = async (
  reservationId: string
): Promise<NullableRef<ReservationCharge>> => {
  if (!UUID_PATTERN.test(reservationId)) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const row = await readReservationChargeRow(
    supabase,
    reservationId
  );

  if (row === null) {
    return null;
  }

  const proposal = isReservationChargeable({
    parentReservationId: row.parent_reservation_id,
    status: row.status,
  })
    ? await readReservationChargeProposal(
        supabase,
        reservationId
      )
    : RESERVATION_CHARGE_NO_PROPOSAL;

  return mapReservationCharge(row, proposal);
};
