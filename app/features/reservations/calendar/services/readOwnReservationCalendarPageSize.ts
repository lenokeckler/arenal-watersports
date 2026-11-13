import {
  SUPABASE_TABLE,
  SUPABASE_WORKER_COLUMN,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { readSignedInUserId } from "@/app/services/authentication/readSignedInUserId";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_CALENDAR_LIST } from "@/app/components/reservation-calendar/constants/ReservationCalendarList.constants";
import { RESERVATION_CALENDAR_LIST_ERROR } from "@/app/components/reservation-calendar/constants/ReservationCalendarList.constants";
import type { ReservationCalendarPageSize } from "@/app/components/reservation-calendar/models/ReservationCalendarPageSize.type";
import { isReservationCalendarPageSize } from "@/app/components/reservation-calendar/utils/isReservationCalendarPageSize";

export const readOwnReservationCalendarPageSize =
  async (): Promise<
    NullableRef<ReservationCalendarPageSize>
  > => {
    const supabase = await createServerSupabaseClient();
    const userId = await readSignedInUserId(supabase);

    if (!userId) {
      return null;
    }

    const { data, error } = await supabase
      .from(SUPABASE_TABLE.WORKERS)
      .select(
        SUPABASE_WORKER_COLUMN.RESERVATION_CALENDAR_PAGE_SIZE
      )
      .eq(SUPABASE_WORKER_COLUMN.ID, userId)
      .maybeSingle();

    throwIfSupabaseError(
      error,
      RESERVATION_CALENDAR_LIST_ERROR.PAGE_SIZE_READ
    );

    return data &&
      isReservationCalendarPageSize(
        data.reservation_calendar_page_size
      )
      ? data.reservation_calendar_page_size
      : RESERVATION_CALENDAR_LIST.DEFAULT_PAGE_SIZE;
  };
