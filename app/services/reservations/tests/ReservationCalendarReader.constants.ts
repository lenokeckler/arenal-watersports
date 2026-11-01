import {
  PAGINATION,
  RESERVATION_CALENDAR_QUERY,
} from "@/app/constants";
import type { ReservationCalendarQueryPage } from "../models/ReservationCalendarQueryPage.interface";
import type { ReservationCalendarQueryRow } from "../models/ReservationCalendarQueryRow.type";

const RESERVATION_ID_PREFIX = "calendar-reservation-";
const ADDITIONAL_PAGE_COUNT = 2;
const ADDITIONAL_ROW_COUNT = 1;
const COUNT_STEP = 1;

const createRow = (
  index: number
): ReservationCalendarQueryRow =>
  ({
    id: `${RESERVATION_ID_PREFIX}${index}`,
  }) as unknown as ReservationCalendarQueryRow;

export const RESERVATION_CALENDAR_READER_TEST = {
  COUNT_CHANGE: COUNT_STEP,
  FIRST_PAGE: PAGINATION.DEFAULT_PAGE,
  INITIAL_READ_COUNT: PAGINATION.DEFAULT_PAGE,
  READ_COUNT_CHANGE: COUNT_STEP,
  PAGE_COUNT_FOR_CONCURRENCY:
    RESERVATION_CALENDAR_QUERY.MAX_CONCURRENT_PAGE_READS +
    ADDITIONAL_PAGE_COUNT,
  PAGE_SIZE: RESERVATION_CALENDAR_QUERY.PAGE_SIZE,
  TWO_PAGE_COUNT:
    RESERVATION_CALENDAR_QUERY.PAGE_SIZE +
    ADDITIONAL_ROW_COUNT,
  createPage: (
    page: number,
    totalCount: number
  ): ReservationCalendarQueryPage => {
    const firstIndex =
      page * RESERVATION_CALENDAR_QUERY.PAGE_SIZE;
    const rowCount = Math.min(
      RESERVATION_CALENDAR_QUERY.PAGE_SIZE,
      totalCount - firstIndex
    );
    return {
      count: totalCount,
      rows: Array.from({ length: rowCount }, (_, index) =>
        createRow(firstIndex + index)
      ),
    };
  },
  createRow,
};
