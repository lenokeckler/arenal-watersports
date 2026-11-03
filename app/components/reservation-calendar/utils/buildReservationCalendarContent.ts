import type { NullableUndefined } from "@/app/types";
import type { CalendarDate } from "@/app/types";
import type { CalendarPeriod } from "@/app/components/calendar/models";
import {
  addCalendarDays,
  buildCalendarDays,
  toCalendarUtcDate,
} from "@/app/components/calendar/utils/calendarDateArithmetic";
import { formatCalendarDate } from "@/app/components/calendar/utils/formatCalendarPresentation";
import type { ReservationCalendarContent } from "../models/ReservationCalendarContent.interface";
import type { ReservationCalendarDayGroup } from "../models/ReservationCalendarDayGroup.interface";
import type { ReservationCalendarBlock } from "../models/ReservationCalendarBlock.interface";
import type { ReservationCalendarEntry } from "../models/ReservationCalendarEntry.interface";
import type { ReservationCalendarSnapshot } from "../models/ReservationCalendarSnapshot.interface";
import { buildReservationCalendarBlock } from "./buildReservationCalendarBlock";
import { reservationIntersectsCalendarDay } from "./reservationIntersectsCalendarDay";
import { validateReservationCalendarSnapshot } from "./validateReservationCalendarSnapshot";

const compareDates = (
  firstDate: CalendarDate,
  secondDate: CalendarDate
): number =>
  toCalendarUtcDate(firstDate).getTime() -
  toCalendarUtcDate(secondDate).getTime();

const getDisplayedDays = (
  snapshot: ReservationCalendarSnapshot,
  period: CalendarPeriod
): CalendarDate[] => {
  const coverageEnd = addCalendarDays(
    snapshot.endDateExclusive,
    -1
  );
  const start =
    compareDates(snapshot.startDate, period.start) > 0
      ? snapshot.startDate
      : period.start;
  const end =
    compareDates(coverageEnd, period.end) < 0
      ? coverageEnd
      : period.end;
  if (compareDates(start, end) > 0) {
    return [];
  }
  return buildCalendarDays(start, end);
};

const coversDisplayedPeriod = (
  snapshot: ReservationCalendarSnapshot,
  period: CalendarPeriod
): boolean =>
  compareDates(snapshot.startDate, period.start) <= 0 &&
  compareDates(
    snapshot.endDateExclusive,
    addCalendarDays(period.end, 1)
  ) >= 0;

const compareEntries = (
  firstEntry: ReservationCalendarEntry,
  secondEntry: ReservationCalendarEntry
): number => {
  const startDifference =
    Date.parse(firstEntry.startsAt) -
    Date.parse(secondEntry.startsAt);
  if (startDifference !== 0) {
    return startDifference;
  }
  if (firstEntry.id < secondEntry.id) {
    return -1;
  }
  if (firstEntry.id > secondEntry.id) {
    return 1;
  }
  return 0;
};

const buildDateGroup = (
  date: CalendarDate,
  entries: readonly ReservationCalendarEntry[],
  blocks: readonly ReservationCalendarBlock[]
): ReservationCalendarDayGroup => {
  const visibleBlocks = entries.flatMap((entry, index) =>
    reservationIntersectsCalendarDay(entry, date)
      ? [blocks[index]]
      : []
  );
  return {
    blocks: visibleBlocks,
    date,
    dateLabel: formatCalendarDate(date),
  };
};

const buildMissingContent =
  (): ReservationCalendarContent => ({
    coversPeriod: false,
    groups: [],
    hasAllResults: false,
    hasSnapshot: false,
    loadedCount: 0,
    totalCount: null,
  });

export const buildReservationCalendarContent = (
  snapshot: NullableUndefined<ReservationCalendarSnapshot>,
  period: CalendarPeriod
): ReservationCalendarContent => {
  if (snapshot === undefined) {
    return buildMissingContent();
  }
  validateReservationCalendarSnapshot(snapshot);
  const entries = [...snapshot.entries].sort(
    compareEntries
  );
  const blocks = entries.map(buildReservationCalendarBlock);
  const groups = getDisplayedDays(snapshot, period)
    .map((date) => buildDateGroup(date, entries, blocks))
    .filter((group) => group.blocks.length > 0);
  return {
    coversPeriod: coversDisplayedPeriod(snapshot, period),
    groups,
    hasAllResults:
      snapshot.entries.length === snapshot.totalCount,
    hasSnapshot: true,
    loadedCount: snapshot.entries.length,
    totalCount: snapshot.totalCount,
  };
};
