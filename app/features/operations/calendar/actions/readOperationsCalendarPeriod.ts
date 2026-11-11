"use server";

import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarSnapshotRequest } from "@/app/services/reservations/models/ReservationCalendarSnapshotRequest.interface";
import { readOperationsCalendarSnapshot } from "@/app/services/reservations/readOperationsCalendarSnapshot";

export const readOperationsCalendarPeriod = async (
  request: ReservationCalendarSnapshotRequest
): Promise<ReservationCalendarSnapshot> =>
  await readOperationsCalendarSnapshot(request);
