import { PAGINATION } from "@/app/constants";
import type { ReservationCalendarWindow } from "../models/ReservationCalendarWindow.interface";

export const QUERY_WINDOW: ReservationCalendarWindow = {
  endsAt: "2026-10-15T06:00:00.000Z",
  page: PAGINATION.DEFAULT_PAGE,
  startsAt: "2026-10-14T06:00:00.000Z",
};

export const QUERY_TEST = {
  COUNT: 23,
  HEADERS: {
    "content-range": "0-9/23",
    "content-type": "application/json",
  },
  KEY: "calendar-query-test-key",
  OPERATION: "Inspect calendar reservation request",
  REQUEST_ERROR: "Calendar query did not produce a request",
  URL: "https://calendar-query.test",
  WHITESPACE: /\s/g,
} as const;

export const QUERY_EXPECTED = {
  ALIAS_START: "lt.2026-10-15T06:00:00.000Z",
  COUNT: "count=exact",
  DEPARTURES:
    "(closed_at.is.null,closed_at.gt.2026-10-14T06:00:00.000Z,and(dispatched_at.eq.2026-10-14T06:00:00.000Z,closed_at.eq.2026-10-14T06:00:00.000Z))",
  ORDER: "starts_at.asc,id.asc",
  PARAMETERS: {
    ALIAS_CLOSURE: "matching_dispatches.or",
    ALIAS_START: "matching_dispatches.dispatched_at",
    LIMIT: "limit",
    OFFSET: "offset",
    ORDER: "order",
    PAYLOAD_DISPATCHES: "reservation_dispatches.",
    PREFER: "prefer",
    ROOT: "or",
    SELECT: "select",
    STATUS: "status",
  },
  RESERVATIONS:
    "(and(starts_at.lt.2026-10-15T06:00:00.000Z,ends_at.gt.2026-10-14T06:00:00.000Z),matching_dispatches.not.is.null)",
  STATUS: "in.(dispatched,scheduled)",
} as const;

export const INVALID_CANONICAL_QUERY_INSTANTS = [
  "9999-12-31T23:00:00-02:00",
  "0000-01-01T00:00:00+02:00",
] as const;

export const INVALID_QUERY_INSTANTS = [
  ...INVALID_CANONICAL_QUERY_INSTANTS,
  "invalid",
  "2026-10-14T06:00:00",
  "2026-02-30T06:00:00Z",
  "2026-10-14T24:00:00Z",
  "2026-10-14T06:00:00.1234Z",
  "2026-10-14T06:00:00+24:00",
  "2026-10-14T06:00:00Z),status.eq.closed",
] as const;

export const INVALID_QUERY_PAGES = [
  -1,
  1.5,
  Number.NaN,
  Number.POSITIVE_INFINITY,
  Number.MAX_SAFE_INTEGER + 1,
  Number.MAX_SAFE_INTEGER,
  Math.floor(
    Number.MAX_SAFE_INTEGER / PAGINATION.DEFAULT_PAGE_SIZE
  ),
] as const;

export const INVALID_QUERY_ENDS = [
  QUERY_WINDOW.startsAt,
  "2026-10-14T05:59:59.999Z",
] as const;

export const VALID_QUERY_INSTANTS = [
  [
    "2026-12-31T23:59:59.999-06:00",
    "2027-01-01T05:59:59.999Z",
  ],
  ["2027-01-01T00:00:00+02:00", "2026-12-31T22:00:00.000Z"],
  [
    "2024-02-29T00:00:00.123-06:00",
    "2024-02-29T06:00:00.123Z",
  ],
  [
    "2026-10-14T08:00:00.1+02:00",
    "2026-10-14T06:00:00.100Z",
  ],
] as const;

export const MAXIMUM_QUERY_PAGE = Math.floor(
  (Number.MAX_SAFE_INTEGER -
    (PAGINATION.DEFAULT_PAGE_SIZE - 1)) /
    PAGINATION.DEFAULT_PAGE_SIZE
);

export const OFFSET_QUERY_WINDOW: ReservationCalendarWindow =
  {
    ...QUERY_WINDOW,
    endsAt: "2026-10-15T00:00:00-06:00",
    startsAt: "2026-10-14T08:00:00+02:00",
  };
