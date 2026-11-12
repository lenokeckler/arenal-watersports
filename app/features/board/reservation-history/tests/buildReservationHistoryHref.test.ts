import { describe, expect, it } from "vitest";
import { buildReservationHistoryHref } from "../utils/buildReservationHistoryHref";
import {
  HREF_EMPTY_QUERY,
  HREF_FULL_QUERY,
  HREF_FULL_QUERY_STRING,
  HREF_ROOT,
} from "./ReservationHistoryHref.constants";

describe("buildReservationHistoryHref", () => {
  it("returns the bare path for an empty query", () => {
    expect(
      buildReservationHistoryHref(HREF_EMPTY_QUERY)
    ).toBe(HREF_ROOT);
  });

  it("appends the query string", () => {
    expect(
      buildReservationHistoryHref(HREF_FULL_QUERY)
    ).toBe(`${HREF_ROOT}?${HREF_FULL_QUERY_STRING}`);
  });
});
