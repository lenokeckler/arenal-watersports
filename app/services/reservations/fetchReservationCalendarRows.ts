import {
  PAGINATION,
  RESERVATION_CALENDAR_QUERY as query,
  RESERVATION_CALENDAR_QUERY_ERROR as error,
} from "@/app/constants";
import type { ReservationCalendarPageReader } from "./models/ReservationCalendarPageReader.type";
import type { ReservationCalendarQueryPage } from "./models/ReservationCalendarQueryPage.interface";
import type { ReservationCalendarQueryRow } from "./models/ReservationCalendarQueryRow.type";
import type { ReservationCalendarReadResult } from "./models/ReservationCalendarReadResult.interface";

const getTotalCount = (
  firstPage: ReservationCalendarQueryPage
): number => {
  if (firstPage.count === null) {
    throw new Error(error.MISSING_COUNT);
  }
  if (
    !Number.isSafeInteger(firstPage.count) ||
    firstPage.count < query.MINIMUM_TOTAL_COUNT
  ) {
    throw new Error(error.INCOMPLETE_RESULTS);
  }
  return firstPage.count;
};

const validatePage = (
  result: ReservationCalendarQueryPage,
  page: number,
  totalCount: number
): readonly ReservationCalendarQueryRow[] => {
  const expectedRows = Math.min(
    query.PAGE_SIZE,
    totalCount - page * query.PAGE_SIZE
  );
  if (
    result.count !== totalCount ||
    result.rows === null ||
    result.rows.length !== expectedRows
  ) {
    throw new Error(error.INCOMPLETE_RESULTS);
  }
  return result.rows;
};

const readRemainingPages = async (
  readPage: ReservationCalendarPageReader,
  pageCount: number,
  totalCount: number
): Promise<readonly ReservationCalendarQueryRow[]> => {
  const rows: ReservationCalendarQueryRow[] = [];
  for (
    let firstPage = PAGINATION.ONE_PAGE;
    firstPage < pageCount;
    firstPage += query.MAX_CONCURRENT_PAGE_READS
  ) {
    const batchSize = Math.min(
      query.MAX_CONCURRENT_PAGE_READS,
      pageCount - firstPage
    );
    const pages = Array.from(
      { length: batchSize },
      (_, index) => firstPage + index
    );
    const results = await Promise.all(
      pages.map(async (page) => ({
        page,
        result: await readPage(page),
      }))
    );
    rows.push(
      ...results.flatMap(({ page, result }) =>
        validatePage(result, page, totalCount)
      )
    );
  }
  return rows;
};

const assertUniqueReservationIds = (
  rows: readonly ReservationCalendarQueryRow[]
): void => {
  const reservationIds = new Set<string>();
  for (const row of rows) {
    if (reservationIds.has(row.id)) {
      throw new Error(error.DUPLICATE_RESERVATION);
    }
    reservationIds.add(row.id);
  }
};

export const fetchReservationCalendarRows = async (
  readPage: ReservationCalendarPageReader
): Promise<ReservationCalendarReadResult> => {
  const firstPage = await readPage(PAGINATION.DEFAULT_PAGE);
  const totalCount = getTotalCount(firstPage);
  const firstRows = validatePage(
    firstPage,
    PAGINATION.DEFAULT_PAGE,
    totalCount
  );
  const pageCount = Math.ceil(totalCount / query.PAGE_SIZE);
  const rows = [
    ...firstRows,
    ...(await readRemainingPages(
      readPage,
      pageCount,
      totalCount
    )),
  ];
  if (rows.length !== totalCount) {
    throw new Error(error.INCOMPLETE_RESULTS);
  }
  assertUniqueReservationIds(rows);
  return { rows, totalCount };
};
