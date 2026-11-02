import { formatReservationCalendarDateTime } from "@/app/components/reservation-calendar/utils/formatReservationCalendarDateTime";
import { CALENDAR_PRESENTATION } from "@/app/constants";
import { RESERVATION_DETAIL_COPY as copy } from "../constants/ReservationDetailCopy.constants";
import type { ReservationDetail } from "../models/ReservationDetail.interface";
import type { ReservationDetailOverviewEntryProps } from "../models/ReservationDetailOverviewEntryProps.interface";
import { formatReservationDetailDuration } from "./formatReservationDetailDuration";

export const createReservationDetailOverviewEntries = (
  detail: ReservationDetail
): ReservationDetailOverviewEntryProps[] => [
  {
    label: copy.RESERVATION_DATE,
    value: formatReservationCalendarDateTime(
      detail.starts_at
    ),
  },
  {
    label: copy.DURATION,
    value: formatReservationDetailDuration(
      detail.duration_minutes
    ),
  },
  {
    label: copy.PEOPLE,
    value: detail.people_count.toLocaleString(
      CALENDAR_PRESENTATION.LOCALE
    ),
  },
  { label: copy.CUSTOMER, value: detail.customer_name },
  ...(detail.cancellation_reason === null
    ? []
    : [
        {
          label: copy.CANCELLATION_REASON,
          value: detail.cancellation_reason,
        },
      ]),
];
