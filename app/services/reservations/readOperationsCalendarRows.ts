import { SUPABASE_WORK_AREA } from "@/app/constants";
import { readReservationCalendarRows } from "./readReservationCalendarRows";
import type { ReservationCalendarReadResult } from "./models/ReservationCalendarReadResult.interface";
import type { ReservationCalendarReadWindow } from "./models/ReservationCalendarReadWindow.interface";

export const readOperationsCalendarRows = async (
  window: ReservationCalendarReadWindow
): Promise<ReservationCalendarReadResult> =>
  await readReservationCalendarRows(
    window,
    SUPABASE_WORK_AREA.OPERATIONS
  );
