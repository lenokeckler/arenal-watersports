import {
  RESERVATION_CALENDAR_QUERY as query,
  STRING,
} from "@/app/constants";
import type { ReservationCalendarFilters } from "../models/ReservationCalendarFilters.interface";
import type { ReservationCalendarFilterColumn } from "../models/ReservationCalendarFilterColumn.type";
import type { ReservationCalendarFilterOperator } from "../models/ReservationCalendarFilterOperator.type";
import type { ReservationCalendarWindow } from "../models/ReservationCalendarWindow.interface";

const predicate = (
  column: ReservationCalendarFilterColumn,
  operator: ReservationCalendarFilterOperator,
  instant?: string
): string =>
  [column, operator, instant]
    .filter((part): boolean => part !== undefined)
    .join(query.SYNTAX.FIELD_SEPARATOR);

const conjunction = (predicates: string[]): string =>
  `${query.SYNTAX.AND}${query.SYNTAX.OPEN_GROUP}${predicates.join(STRING.COMMA)}${query.SYNTAX.CLOSE_GROUP}`;

const buildDepartureFilter = (
  window: ReservationCalendarWindow
): string =>
  [
    predicate(
      query.COLUMNS.CLOSED_AT,
      query.OPERATORS.IS_NULL
    ),
    predicate(
      query.COLUMNS.CLOSED_AT,
      query.OPERATORS.GREATER_THAN,
      window.startsAt
    ),
    conjunction([
      predicate(
        query.COLUMNS.DISPATCHED_AT,
        query.OPERATORS.EQUAL,
        window.startsAt
      ),
      predicate(
        query.COLUMNS.CLOSED_AT,
        query.OPERATORS.EQUAL,
        window.startsAt
      ),
    ]),
  ].join(STRING.COMMA);

const buildScheduledFilter = (
  window: ReservationCalendarWindow
): string =>
  [
    conjunction([
      predicate(
        query.COLUMNS.STARTS_AT,
        query.OPERATORS.LESS_THAN,
        window.endsAt
      ),
      predicate(
        query.COLUMNS.ENDS_AT,
        query.OPERATORS.GREATER_THAN,
        window.startsAt
      ),
    ]),
    predicate(
      query.MATCHING_DISPATCHES,
      query.OPERATORS.NOT_NULL
    ),
  ].join(STRING.COMMA);

export const buildReservationCalendarFilters = (
  window: ReservationCalendarWindow
): ReservationCalendarFilters => ({
  departures: buildDepartureFilter(window),
  reservations: buildScheduledFilter(window),
});
