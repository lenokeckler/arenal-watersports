import { RESERVATION_CALENDAR_LIST } from "@/app/components/reservation-calendar/constants/ReservationCalendarList.constants";
import { reportServerError } from "@/app/services/observability";
import { SERVER_OPERATION } from "@/app/constants";
import type { ReservationCalendarPageSizeRead } from "../models/ReservationCalendarPageSizeRead.interface";
import { readOwnReservationCalendarPageSize } from "./readOwnReservationCalendarPageSize";

export const readReservationCalendarPageSizePreference =
  async (): Promise<ReservationCalendarPageSizeRead> => {
    try {
      return {
        pageSize:
          (await readOwnReservationCalendarPageSize()) ??
          RESERVATION_CALENDAR_LIST.DEFAULT_PAGE_SIZE,
        hasError: false,
      };
    } catch (error) {
      reportServerError(
        SERVER_OPERATION.READ_RESERVATION_CALENDAR_PAGE_SIZE,
        error
      );
      return {
        pageSize:
          RESERVATION_CALENDAR_LIST.DEFAULT_PAGE_SIZE,
        hasError: true,
      };
    }
  };
