import { describe, expect, it } from "vitest";
import { parseReservationHistoryDate } from "../utils/parseReservationHistoryDate";
import {
  HISTORY_INVALID_DATES,
  HISTORY_LATER_VALID_DATE,
  HISTORY_LEAP_DAY,
  HISTORY_MAX_DATE,
  HISTORY_MIN_DATE,
  HISTORY_VALID_DATE,
} from "./ReservationHistoryQuery.constants";

describe("parseReservationHistoryDate", () => {
  it("accepts a real calendar day", () => {
    expect(
      parseReservationHistoryDate(HISTORY_VALID_DATE)
    ).toBe(HISTORY_VALID_DATE);
  });

  it("accepts a leap day", () => {
    expect(
      parseReservationHistoryDate(HISTORY_LEAP_DAY)
    ).toBe(HISTORY_LEAP_DAY);
  });

  it("accepts the lowest and highest Postgres years", () => {
    expect(
      parseReservationHistoryDate(HISTORY_MIN_DATE)
    ).toBe(HISTORY_MIN_DATE);
    expect(
      parseReservationHistoryDate(HISTORY_MAX_DATE)
    ).toBe(HISTORY_MAX_DATE);
  });

  it("takes the first value of a repeated param", () => {
    expect(
      parseReservationHistoryDate([
        HISTORY_VALID_DATE,
        HISTORY_LATER_VALID_DATE,
      ])
    ).toBe(HISTORY_VALID_DATE);
  });

  it("ignores malformed dates and days that do not exist", () => {
    for (const rawDate of HISTORY_INVALID_DATES) {
      expect(
        parseReservationHistoryDate(rawDate)
      ).toBeNull();
    }
  });

  it("ignores an absent param", () => {
    expect(
      parseReservationHistoryDate(undefined)
    ).toBeNull();
  });
});
