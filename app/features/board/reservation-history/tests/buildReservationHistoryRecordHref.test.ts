import { describe, expect, it } from "vitest";
import { buildReservationHistoryRecordHref } from "../utils/buildReservationHistoryRecordHref";
import {
  HREF_EMPTY_QUERY,
  HREF_FULL_QUERY,
  HREF_FULL_QUERY_STRING,
  HREF_RECORD_ID,
  HREF_ROOT,
} from "./ReservationHistoryHref.constants";

describe("buildReservationHistoryRecordHref", () => {
  it("returns the record path for an empty query", () => {
    expect(
      buildReservationHistoryRecordHref(
        HREF_RECORD_ID,
        HREF_EMPTY_QUERY
      )
    ).toBe(`${HREF_ROOT}/${HREF_RECORD_ID}`);
  });

  it("carries the filters and page to the record", () => {
    expect(
      buildReservationHistoryRecordHref(
        HREF_RECORD_ID,
        HREF_FULL_QUERY
      )
    ).toBe(
      `${HREF_ROOT}/${HREF_RECORD_ID}?${HREF_FULL_QUERY_STRING}`
    );
  });
});
