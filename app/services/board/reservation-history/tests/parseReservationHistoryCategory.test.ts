import { describe, expect, it } from "vitest";
import { parseReservationHistoryCategory } from "../utils/parseReservationHistoryCategory";
import {
  HISTORY_INVALID_CATEGORIES,
  HISTORY_SECOND_CATEGORY,
  HISTORY_VALID_CATEGORY,
} from "./ReservationHistoryQuery.constants";

describe("parseReservationHistoryCategory", () => {
  it("accepts a UUID", () => {
    expect(
      parseReservationHistoryCategory(
        HISTORY_VALID_CATEGORY
      )
    ).toBe(HISTORY_VALID_CATEGORY);
  });

  it("takes the first value of a repeated param", () => {
    expect(
      parseReservationHistoryCategory([
        HISTORY_VALID_CATEGORY,
        HISTORY_SECOND_CATEGORY,
      ])
    ).toBe(HISTORY_VALID_CATEGORY);
  });

  it("ignores values that are not UUIDs", () => {
    for (const rawCategory of HISTORY_INVALID_CATEGORIES) {
      expect(
        parseReservationHistoryCategory(rawCategory)
      ).toBeNull();
    }
  });

  it("ignores an absent param", () => {
    expect(
      parseReservationHistoryCategory(undefined)
    ).toBeNull();
  });
});
