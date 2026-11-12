import type { ReservationCalendarQueryRow } from "../models/ReservationCalendarQueryRow.type";

export const RESERVATION_CALENDAR_QUERY_MAPPING_ROW = {
  customer_name: "Tour customer",
  ends_at: "2026-10-29T17:00:00Z",
  id: "reservation-with-guides",
  matching_dispatches: [],
  reservation_dispatches: [],
  reservation_guides: [
    {
      worker_id: "internal-guide",
      workers: {
        full_name: "Internal Guide",
        is_external_guide: false,
      },
    },
    {
      worker_id: "external-guide",
      workers: {
        full_name: "External Guide",
        is_external_guide: true,
      },
    },
  ],
  reservation_items: [],
  starts_at: "2026-10-29T16:00:00Z",
  status: "scheduled",
} as unknown as ReservationCalendarQueryRow;
