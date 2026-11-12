import { describe, expect, it } from "vitest";
import {
  PAGINATION,
  POSTGRES_INTEGER_MAX,
} from "@/app/constants";
import { resolveReservationHistoryPageIndex } from "../utils/resolveReservationHistoryPageIndex";
import {
  HISTORY_FIRST_PAGE_PARAMETER,
  HISTORY_MAX_PAGE_PARAMETER,
  HISTORY_PAGE_PARAMETERS,
} from "./ReservationHistoryQuery.constants";

describe("resolveReservationHistoryPageIndex", () => {
  it("maps the first page to index zero", () => {
    expect(
      resolveReservationHistoryPageIndex(
        HISTORY_FIRST_PAGE_PARAMETER
      )
    ).toBe(PAGINATION.DEFAULT_PAGE);
  });

  it("converts a 1-based page to a 0-based index", () => {
    expect(
      resolveReservationHistoryPageIndex(
        HISTORY_PAGE_PARAMETERS.VALID
      )
    ).toBe(HISTORY_PAGE_PARAMETERS.VALID_INDEX);
  });

  it("reads the first page parameter", () => {
    expect(
      resolveReservationHistoryPageIndex([
        ...HISTORY_PAGE_PARAMETERS.MULTIPLE,
      ])
    ).toBe(
      Number(
        HISTORY_PAGE_PARAMETERS.MULTIPLE[
          PAGINATION.DEFAULT_PAGE
        ]
      ) - PAGINATION.ONE_PAGE
    );
  });

  it("defaults an absent param to the first page", () => {
    expect(
      resolveReservationHistoryPageIndex(undefined)
    ).toBe(PAGINATION.DEFAULT_PAGE);
  });

  it("defaults invalid and unsafe params to the first page", () => {
    for (const rawPage of HISTORY_PAGE_PARAMETERS.INVALID) {
      expect(
        resolveReservationHistoryPageIndex(rawPage)
      ).toBe(PAGINATION.DEFAULT_PAGE);
    }
  });

  it("accepts the largest page the SQL integer allows", () => {
    expect(
      resolveReservationHistoryPageIndex(
        HISTORY_MAX_PAGE_PARAMETER
      )
    ).toBe(POSTGRES_INTEGER_MAX);
  });
});
