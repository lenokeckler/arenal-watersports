import { RESERVATION_CALENDAR_ACTIVE_STATUS } from "@/app/constants";
import type { ReservationCalendarQueryRow } from "@/app/services/reservations/models/ReservationCalendarQueryRow.type";
import {
  CALENDAR_CATEGORY,
  CALENDAR_DISPATCH,
  CALENDAR_RESERVATION,
  CALENDAR_UNIT_CODE,
  CATEGORY_COMMITMENT,
  EXTRA_COMMITMENT,
} from "./ReservationCalendar.constants";

export const CALENDAR_QUERY_ROW: ReservationCalendarQueryRow =
  {
    customer_name: CALENDAR_RESERVATION.customer_name,
    ends_at: CALENDAR_RESERVATION.ends_at,
    id: CALENDAR_RESERVATION.id,
    reservation_dispatches: [
      {
        category: CALENDAR_CATEGORY,
        category_id: CALENDAR_CATEGORY.id,
        closed_at: null,
        dispatched_at: CALENDAR_DISPATCH.dispatched_at,
        ends_at: null,
        id: CALENDAR_DISPATCH.id,
      },
    ],
    reservation_items: [
      { ...CATEGORY_COMMITMENT, unit: null },
      { ...EXTRA_COMMITMENT, unit: null },
      {
        category: null,
        category_id: null,
        extra_id: null,
        quantity: null,
        unit: {
          category: CALENDAR_CATEGORY,
          code: CALENDAR_UNIT_CODE,
        },
        unit_id: CALENDAR_RESERVATION.id,
      },
    ],
    starts_at: CALENDAR_RESERVATION.starts_at,
    status: RESERVATION_CALENDAR_ACTIVE_STATUS.SCHEDULED,
  };
