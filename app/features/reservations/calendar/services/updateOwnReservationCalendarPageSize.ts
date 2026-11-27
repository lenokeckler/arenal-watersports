import {
  SUPABASE_TABLE,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readSignedInUserId } from "@/app/services/authentication/readSignedInUserId";
import {
  SupabaseNoRowsAffectedError,
  throwIfNoRowsAffected,
} from "@/app/utils/supabase-error/SupabaseNoRowsAffectedError";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_CALENDAR_LIST_ERROR } from "@/app/components/reservation-calendar/constants/ReservationCalendarList.constants";
import type { ReservationCalendarPageSize } from "@/app/components/reservation-calendar/models/ReservationCalendarPageSize.type";
import { isReservationCalendarPageSize } from "@/app/components/reservation-calendar/utils/isReservationCalendarPageSize";

export const updateOwnReservationCalendarPageSize = async (
  value: unknown
): Promise<void> => {
  if (!isReservationCalendarPageSize(value)) {
    throw new Error(
      RESERVATION_CALENDAR_LIST_ERROR.INVALID_REQUEST
    );
  }

  const pageSize: ReservationCalendarPageSize = value;
  const supabase = await createServerSupabaseClient();
  const userId = await readSignedInUserId(supabase);

  if (!userId) {
    throw new SupabaseNoRowsAffectedError(
      SUPABASE_TABLE.WORKERS
    );
  }

  const { data, error } = await supabase
    .from(SUPABASE_TABLE.WORKERS)
    .update({
      [SUPABASE_WORKER_COLUMN.RESERVATION_CALENDAR_PAGE_SIZE]:
        pageSize,
    })
    .eq(SUPABASE_WORKER_COLUMN.ID, userId)
    .select(SUPABASE_WORKER_COLUMN.ID);

  throwIfSupabaseError(error, SUPABASE_TABLE.WORKERS);
  throwIfNoRowsAffected(data ?? [], SUPABASE_TABLE.WORKERS);
};
