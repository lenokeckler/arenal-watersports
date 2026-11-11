import { SUPABASE_WORK_AREA } from "@/app/constants";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarSnapshotRequest } from "./models/ReservationCalendarSnapshotRequest.interface";
import { readCalendarSnapshotForArea } from "./readCalendarSnapshotForArea";

export const readOperationsCalendarSnapshot = async (
  input: ReservationCalendarSnapshotRequest
): Promise<ReservationCalendarSnapshot> =>
  await readCalendarSnapshotForArea(
    input,
    SUPABASE_WORK_AREA.OPERATIONS
  );
