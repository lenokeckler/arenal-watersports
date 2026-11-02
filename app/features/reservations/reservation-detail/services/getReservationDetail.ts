import { mapReservationDetail } from "../utils/mapReservationDetail";
import type { ReservationDetailResult } from "../models/ReservationDetail.interface";
import { UUID_PATTERN } from "@/app/constants";
import { getAuthorizedReservationDetailClient } from "./getAuthorizedReservationDetailClient";
import { getReservationDetailWorkerNames } from "./getReservationDetailWorkerNames";
import { loadReservationDetailSource } from "./loadReservationDetailSource";

export const getReservationDetail = async (
  reservationId: string
): Promise<ReservationDetailResult> => {
  if (!UUID_PATTERN.test(reservationId)) {
    return null;
  }

  const supabase =
    await getAuthorizedReservationDetailClient();
  const source = await loadReservationDetailSource(
    supabase,
    reservationId
  );

  if (!source) {
    return null;
  }

  const workerNames = await getReservationDetailWorkerNames(
    supabase,
    source
  );
  return mapReservationDetail(source, workerNames);
};
