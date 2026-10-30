import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { readCalendarSnapshotForArea } from "@/app/services/reservations/readCalendarSnapshotForArea";
import type { ReservationCalendarPeriodRequest } from "./models/ReservationCalendarPeriodRequest.interface";

export const readReservationCalendarSnapshot = async (
  input: ReservationCalendarPeriodRequest
): Promise<ReservationCalendarSnapshot> =>
  await readCalendarSnapshotForArea(input);
