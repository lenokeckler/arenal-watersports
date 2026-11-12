import { describe, expect, it, vi } from "vitest";
import {
  PAGINATION,
  RESERVATION_CALENDAR_QUERY,
  RESERVATION_CALENDAR_QUERY_ERROR,
} from "@/app/constants";
import { fetchReservationCalendarRows } from "../fetchReservationCalendarRows";
import type { ReservationCalendarPageReader } from "../models/ReservationCalendarPageReader.type";
import { RESERVATION_CALENDAR_READER_TEST as fixture } from "./ReservationCalendarReader.constants";

describe("fetchReservationCalendarRows", (): void => {
  it("reads pages concurrently within the configured bound and preserves order", async (): Promise<void> => {
    const totalCount =
      fixture.PAGE_SIZE *
      fixture.PAGE_COUNT_FOR_CONCURRENCY;
    let activeReads: number = fixture.INITIAL_READ_COUNT;
    let maximumConcurrentReads: number =
      fixture.INITIAL_READ_COUNT;
    const readPage: ReservationCalendarPageReader = vi.fn(
      async (page) => {
        activeReads += fixture.READ_COUNT_CHANGE;
        maximumConcurrentReads = Math.max(
          maximumConcurrentReads,
          activeReads
        );
        await Promise.resolve();
        activeReads -= fixture.READ_COUNT_CHANGE;
        return fixture.createPage(page, totalCount);
      }
    );

    const result =
      await fetchReservationCalendarRows(readPage);

    expect(result.totalCount).toBe(totalCount);
    expect(result.rows).toHaveLength(totalCount);
    expect(maximumConcurrentReads).toBe(
      RESERVATION_CALENDAR_QUERY.MAX_CONCURRENT_PAGE_READS
    );
    expect(result.rows.map((row) => row.id)).toEqual(
      Array.from(
        { length: totalCount },
        (_, index) => fixture.createRow(index).id
      )
    );
  });

  it("propagates a page query failure", async (): Promise<void> => {
    const queryError = new Error("Calendar page failed");
    const readPage = vi.fn((page: number) => {
      if (page > PAGINATION.DEFAULT_PAGE) {
        return Promise.reject(queryError);
      }
      return Promise.resolve(
        fixture.createPage(page, fixture.TWO_PAGE_COUNT)
      );
    });

    await expect(
      fetchReservationCalendarRows(readPage)
    ).rejects.toBe(queryError);
  });

  it("rejects a missing exact count", async (): Promise<void> => {
    const readPage = vi.fn(() =>
      Promise.resolve({
        count: null,
        rows: [],
      })
    );

    await expect(
      fetchReservationCalendarRows(readPage)
    ).rejects.toThrow(
      RESERVATION_CALENDAR_QUERY_ERROR.MISSING_COUNT
    );
  });

  it("rejects a count that changes between pages", async (): Promise<void> => {
    const readPage = vi.fn((page: number) =>
      Promise.resolve({
        ...fixture.createPage(page, fixture.TWO_PAGE_COUNT),
        count:
          page === fixture.FIRST_PAGE
            ? fixture.TWO_PAGE_COUNT
            : fixture.TWO_PAGE_COUNT + fixture.COUNT_CHANGE,
      })
    );

    await expect(
      fetchReservationCalendarRows(readPage)
    ).rejects.toThrow(
      RESERVATION_CALENDAR_QUERY_ERROR.INCOMPLETE_RESULTS
    );
  });

  it("rejects a short page even when its count is unchanged", async (): Promise<void> => {
    const readPage = vi.fn((page: number) =>
      Promise.resolve({
        ...fixture.createPage(page, fixture.TWO_PAGE_COUNT),
        rows:
          page === fixture.FIRST_PAGE
            ? fixture.createPage(
                page,
                fixture.TWO_PAGE_COUNT
              ).rows
            : [],
      })
    );

    await expect(
      fetchReservationCalendarRows(readPage)
    ).rejects.toThrow(
      RESERVATION_CALENDAR_QUERY_ERROR.INCOMPLETE_RESULTS
    );
  });

  it("rejects duplicate reservation ids", async (): Promise<void> => {
    const duplicateRow = fixture.createRow(
      fixture.FIRST_PAGE
    );
    const readPage = vi.fn(() =>
      Promise.resolve({
        count: RESERVATION_CALENDAR_QUERY.PAGE_SIZE,
        rows: Array.from(
          { length: RESERVATION_CALENDAR_QUERY.PAGE_SIZE },
          () => duplicateRow
        ),
      })
    );

    await expect(
      fetchReservationCalendarRows(readPage)
    ).rejects.toThrow(
      RESERVATION_CALENDAR_QUERY_ERROR.DUPLICATE_RESERVATION
    );
  });
});
