import { UUID_PATTERN } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import type { ReservationRefund } from "../models/ReservationRefund.interface";
import { mapReservationRefund } from "../utils/mapReservationRefund";
import { readReservationRefundRow } from "./readReservationRefundRow";
import { readReservationRefundableNet } from "./readReservationRefundableNet";

export const getReservationRefund = async (
  reservationId: string
): Promise<NullableRef<ReservationRefund>> => {
  if (!UUID_PATTERN.test(reservationId)) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const row = await readReservationRefundRow(
    supabase,
    reservationId
  );

  if (row === null) {
    return null;
  }

  return mapReservationRefund(
    row,
    await readReservationRefundableNet(
      supabase,
      reservationId
    )
  );
};
