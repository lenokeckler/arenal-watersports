import { describe, expect, it } from "vitest";
import {
  PAGINATION,
  RESERVATION_TYPE,
} from "@/app/constants";
import { parseReservationHistorySearchParams } from "../utils/parseReservationHistorySearchParams";
import { HISTORY_EMPTY_FILTERS } from "./ReservationHistory.constants";
import {
  HISTORY_LATER_VALID_DATE,
  HISTORY_PAGE_PARAMETERS,
  HISTORY_VALID_CATEGORY,
  HISTORY_VALID_DATE,
} from "./ReservationHistoryQuery.constants";
import { HISTORY_SEARCH_PARAMS } from "./ReservationHistorySearchParams.constants";

describe("parseReservationHistorySearchParams", () => {
  it("returns the default query for empty params", () => {
    expect(parseReservationHistorySearchParams({})).toEqual(
      {
        filters: HISTORY_EMPTY_FILTERS,
        hasInvertedDateRange: false,
        pageIndex: PAGINATION.DEFAULT_PAGE,
      }
    );
  });

  it("parses every valid param", () => {
    expect(
      parseReservationHistorySearchParams(
        HISTORY_SEARCH_PARAMS.FULL
      )
    ).toEqual({
      filters: {
        categoryId: HISTORY_VALID_CATEGORY,
        from: HISTORY_VALID_DATE,
        to: HISTORY_LATER_VALID_DATE,
        type: RESERVATION_TYPE.TOUR,
      },
      hasInvertedDateRange: false,
      pageIndex: HISTORY_PAGE_PARAMETERS.VALID_INDEX,
    });
  });

  it("ignores every invalid param", () => {
    expect(
      parseReservationHistorySearchParams(
        HISTORY_SEARCH_PARAMS.INVALID
      )
    ).toEqual({
      filters: HISTORY_EMPTY_FILTERS,
      hasInvertedDateRange: false,
      pageIndex: PAGINATION.DEFAULT_PAGE,
    });
  });

  it("takes the first value of repeated params", () => {
    expect(
      parseReservationHistorySearchParams(
        HISTORY_SEARCH_PARAMS.REPEATED
      )
    ).toEqual({
      filters: {
        categoryId: HISTORY_VALID_CATEGORY,
        from: HISTORY_VALID_DATE,
        to: null,
        type: RESERVATION_TYPE.RENTAL,
      },
      hasInvertedDateRange: false,
      pageIndex:
        Number(
          HISTORY_PAGE_PARAMETERS.MULTIPLE[
            PAGINATION.DEFAULT_PAGE
          ]
        ) - PAGINATION.ONE_PAGE,
    });
  });

  it("flags an inverted date range", () => {
    expect(
      parseReservationHistorySearchParams(
        HISTORY_SEARCH_PARAMS.INVERTED
      ).hasInvertedDateRange
    ).toBe(true);
  });

  it("does not flag equal dates", () => {
    expect(
      parseReservationHistorySearchParams(
        HISTORY_SEARCH_PARAMS.SAME_DAY
      ).hasInvertedDateRange
    ).toBe(false);
  });

  it("does not flag a range with one date", () => {
    expect(
      parseReservationHistorySearchParams(
        HISTORY_SEARCH_PARAMS.ONLY_FROM
      ).hasInvertedDateRange
    ).toBe(false);
  });

  it("does not flag a range with an invalid date", () => {
    expect(
      parseReservationHistorySearchParams(
        HISTORY_SEARCH_PARAMS.INVERTED_WITH_INVALID_TO
      ).hasInvertedDateRange
    ).toBe(false);
  });
});
