import { describe, expect, it } from "vitest";
import { PAGINATION } from "@/app/constants";
import { buildReservationHistoryPage } from "../buildReservationHistoryPage";
import { mapReservationHistoryItem } from "../mapReservationHistoryItem";
import {
  HISTORY_CLAMPED_PAGE_INDEX,
  HISTORY_LIST_ROW,
  HISTORY_TOTAL_EXACT,
  HISTORY_TOTAL_WITH_REMAINDER,
} from "./ReservationHistory.constants";

describe("buildReservationHistoryPage", () => {
  it("builds the empty page for no rows", () => {
    expect(buildReservationHistoryPage([])).toStrictEqual({
      items: [],
      pageCount: PAGINATION.ONE_PAGE,
      pageIndex: PAGINATION.DEFAULT_PAGE,
      totalCount: PAGINATION.ZERO_RESULTS,
    });
  });

  it("keeps one page when the total fits in it", () => {
    const page = buildReservationHistoryPage([
      HISTORY_LIST_ROW,
    ]);
    expect(page.pageCount).toBe(PAGINATION.ONE_PAGE);
    expect(page.items).toStrictEqual([
      mapReservationHistoryItem(HISTORY_LIST_ROW),
    ]);
  });

  it("divides an exact total by the page size", () => {
    const page = buildReservationHistoryPage([
      {
        ...HISTORY_LIST_ROW,
        total_count: HISTORY_TOTAL_EXACT,
      },
    ]);
    expect(page.pageCount).toBe(
      HISTORY_TOTAL_EXACT / PAGINATION.DEFAULT_PAGE_SIZE
    );
    expect(page.totalCount).toBe(HISTORY_TOTAL_EXACT);
  });

  it("rounds a remainder up to one more page", () => {
    const page = buildReservationHistoryPage([
      {
        ...HISTORY_LIST_ROW,
        total_count: HISTORY_TOTAL_WITH_REMAINDER,
      },
    ]);
    expect(page.pageCount).toBe(
      Math.ceil(
        HISTORY_TOTAL_WITH_REMAINDER /
          PAGINATION.DEFAULT_PAGE_SIZE
      )
    );
  });

  it("reports the page the database actually returned", () => {
    const page = buildReservationHistoryPage([
      {
        ...HISTORY_LIST_ROW,
        page_index: HISTORY_CLAMPED_PAGE_INDEX,
        total_count: HISTORY_TOTAL_WITH_REMAINDER,
      },
    ]);
    expect(page.pageIndex).toBe(HISTORY_CLAMPED_PAGE_INDEX);
  });
});
