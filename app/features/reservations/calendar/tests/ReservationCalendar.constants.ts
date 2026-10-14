import type { ReservationCalendarCategorySource } from "../models/ReservationCalendarCategorySource.type";
import type { ReservationCalendarDispatchSource } from "../models/ReservationCalendarDispatchSource.interface";
import type { ReservationCalendarItemSource } from "../models/ReservationCalendarItemSource.interface";
import type { ReservationCalendarSource } from "../models/ReservationCalendarSource.interface";

export const CALENDAR_CATEGORY: ReservationCalendarCategorySource =
  {
    id: "category-paddleboard",
    name: "Paddleboard",
  };

export const CALENDAR_UNIT_CODE = "SUP-03";
export const EMPTY_CALENDAR_LABEL = " ";

export const CATEGORY_COMMITMENT: ReservationCalendarItemSource =
  {
    category: CALENDAR_CATEGORY,
    category_id: CALENDAR_CATEGORY.id,
    extra_id: null,
    quantity: 3,
    unit: null,
    unit_id: null,
  };

export const UNIT_COMMITMENT: ReservationCalendarItemSource =
  {
    ...CATEGORY_COMMITMENT,
    category: null,
    category_id: null,
    quantity: null,
    unit: {
      category: CALENDAR_CATEGORY,
      code: CALENDAR_UNIT_CODE,
    },
    unit_id: "unit-paddleboard-03",
  };

export const EXTRA_COMMITMENT: ReservationCalendarItemSource =
  {
    ...CATEGORY_COMMITMENT,
    category: null,
    category_id: null,
    extra_id: "extra-drink",
    quantity: null,
  };

export const CALENDAR_DISPATCH: ReservationCalendarDispatchSource =
  {
    category: CALENDAR_CATEGORY,
    category_id: CALENDAR_CATEGORY.id,
    closed_at: null,
    dispatched_at: "2026-10-14T16:15:00Z",
    ends_at: "2026-10-14T17:15:00Z",
    id: "dispatch-open",
  };

export const CALENDAR_RESERVATION: ReservationCalendarSource =
  {
    customer_name: "María Fernández Vargas",
    ends_at: "2026-10-14T17:00:00Z",
    id: "reservation-01",
    reservation_dispatches: [],
    reservation_items: [CATEGORY_COMMITMENT],
    starts_at: "2026-10-14T16:00:00Z",
    status: "scheduled",
  };

export const CALENDAR_TIME_CASES = [
  ["2026-10-14T05:59:00Z", "23:59"],
  ["2026-10-14T06:00:00Z", "00:00"],
  ["2027-01-01T05:59:00Z", "23:59"],
  ["2027-01-01T06:00:00Z", "00:00"],
  ["2026-10-14T12:15:00-04:00", "10:15"],
  ["2026-10-14T18:15:00+02:00", "10:15"],
] as const;

export const INVALID_CALENDAR_INSTANTS = [
  "invalid-instant",
  "2026-10-14",
  "2026-10-14T16:00:00",
  "2026-10-14T25:00:00Z",
] as const;
