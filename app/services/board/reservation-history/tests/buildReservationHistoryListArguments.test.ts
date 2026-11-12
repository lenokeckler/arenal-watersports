import { describe, expect, it } from "vitest";
import { PAGINATION } from "@/app/constants";
import { buildReservationHistoryListArguments } from "../buildReservationHistoryListArguments";
import {
  HISTORY_EMPTY_FILTERS,
  HISTORY_FULL_FILTERS,
  HISTORY_REQUESTED_PAGE_INDEX,
} from "./ReservationHistory.constants";

describe("buildReservationHistoryListArguments", () => {
  it("omits every empty filter", () => {
    expect(
      buildReservationHistoryListArguments({
        filters: HISTORY_EMPTY_FILTERS,
        pageIndex: HISTORY_REQUESTED_PAGE_INDEX,
      })
    ).toStrictEqual({
      p_page_index: HISTORY_REQUESTED_PAGE_INDEX,
      p_page_size: PAGINATION.DEFAULT_PAGE_SIZE,
    });
  });

  it("sends every present filter", () => {
    expect(
      buildReservationHistoryListArguments({
        filters: HISTORY_FULL_FILTERS,
        pageIndex: PAGINATION.DEFAULT_PAGE,
      })
    ).toStrictEqual({
      p_category_id: HISTORY_FULL_FILTERS.categoryId,
      p_from: HISTORY_FULL_FILTERS.from,
      p_page_index: PAGINATION.DEFAULT_PAGE,
      p_page_size: PAGINATION.DEFAULT_PAGE_SIZE,
      p_to: HISTORY_FULL_FILTERS.to,
      p_type: HISTORY_FULL_FILTERS.type,
    });
  });
});
