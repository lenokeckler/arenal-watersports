import { describe, expect, it } from "vitest";
import { buildReservationHistoryQueryString } from "../utils/buildReservationHistoryQueryString";
import {
  HREF_EMPTY_QUERY,
  HREF_FIRST_PAGE_QUERY,
  HREF_FIRST_PAGE_QUERY_STRING,
  HREF_FULL_QUERY,
  HREF_FULL_QUERY_STRING,
  HREF_PAGE_ONLY_QUERY,
  HREF_PAGE_ONLY_QUERY_STRING,
} from "./ReservationHistoryHref.constants";

describe("buildReservationHistoryQueryString", () => {
  it("returns an empty string without filters on page one", () => {
    expect(
      buildReservationHistoryQueryString(HREF_EMPTY_QUERY)
    ).toBe("");
  });

  it("writes every filter and a 1-based page", () => {
    expect(
      buildReservationHistoryQueryString(HREF_FULL_QUERY)
    ).toBe(HREF_FULL_QUERY_STRING);
  });

  it("omits the page on the first page", () => {
    expect(
      buildReservationHistoryQueryString(
        HREF_FIRST_PAGE_QUERY
      )
    ).toBe(HREF_FIRST_PAGE_QUERY_STRING);
  });

  it("writes the page alone when there are no filters", () => {
    expect(
      buildReservationHistoryQueryString(
        HREF_PAGE_ONLY_QUERY
      )
    ).toBe(HREF_PAGE_ONLY_QUERY_STRING);
  });
});
