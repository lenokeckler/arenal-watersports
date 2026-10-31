"use server";

import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarPeriodRequest } from "../models/ReservationCalendarPeriodRequest.interface";
import { readReservationCalendarSnapshot } from "../readReservationCalendarSnapshot";

export const readReservationCalendarPeriod = async (
  request: ReservationCalendarPeriodRequest
): Promise<ReservationCalendarSnapshot> =>
  await readReservationCalendarSnapshot(request);
