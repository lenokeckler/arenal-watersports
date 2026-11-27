import { UUID_PATTERN } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import type { ReservationExtraTime } from "../models/ReservationExtraTime.interface";
import { mapReservationExtraTime } from "../utils/mapReservationExtraTime";
import { readReservationExtraTimeGroups } from "./readReservationExtraTimeGroups";
import { readReservationExtraTimeReservation } from "./readReservationExtraTimeReservation";
import { readReservationExtraTimeResolution } from "./readReservationExtraTimeResolution";

export const getReservationExtraTime = async (
  reservationId: string
): Promise<NullableRef<ReservationExtraTime>> => {
  if (!UUID_PATTERN.test(reservationId)) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const reservation =
    await readReservationExtraTimeReservation(
      supabase,
      reservationId
    );

  if (reservation === null) {
    return null;
  }

  const [groups, resolution] = await Promise.all([
    readReservationExtraTimeGroups(supabase, reservationId),
    readReservationExtraTimeResolution(
      supabase,
      reservationId
    ),
  ]);

  return mapReservationExtraTime(
    reservation,
    groups,
    resolution
  );
};
