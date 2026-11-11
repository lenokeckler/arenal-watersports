import { SUPABASE_WORK_AREA } from "@/app/constants";
import { assertReservationCalendarAccess } from "./assertReservationCalendarAccess";

export const assertOperationsCalendarAccess =
  async (): Promise<void> =>
    await assertReservationCalendarAccess(
      SUPABASE_WORK_AREA.OPERATIONS
    );
