"use server";

import type { ReservationCalendarPageSize } from "@/app/components/reservation-calendar/models/ReservationCalendarPageSize.type";
import type { ReservationCalendarPageSizeSaveResult } from "@/app/components/reservation-calendar/models/ReservationCalendarPageSizeSaveResult.type";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { reportServerError } from "@/app/services/observability";
import { SERVER_OPERATION } from "@/app/constants";
import { updateOwnReservationCalendarPageSize as updatePreference } from "../services/updateOwnReservationCalendarPageSize";
import { isReservationCalendarPageSize } from "@/app/components/reservation-calendar/utils/isReservationCalendarPageSize";

export const updateOwnReservationCalendarPageSize = async (
  input: unknown
): Promise<ReservationCalendarPageSizeSaveResult> => {
  if (!isReservationCalendarPageSize(input)) {
    return { kind: "failed" };
  }

  await assertReservationCalendarAccess();
  const pageSize: ReservationCalendarPageSize = input;
  try {
    await updatePreference(pageSize);
    return { kind: "saved", pageSize };
  } catch (error) {
    reportServerError(
      SERVER_OPERATION.SAVE_RESERVATION_CALENDAR_PAGE_SIZE,
      error
    );
    return { kind: "failed" };
  }
};
