import { describe, expect, it } from "vitest";
import { RESERVATION_TYPE } from "@/app/constants";
import { parseReservationHistoryType } from "../utils/parseReservationHistoryType";
import {
  HISTORY_INVALID_TYPES,
  HISTORY_VALID_TYPES,
} from "./ReservationHistoryQuery.constants";

describe("parseReservationHistoryType", () => {
  it("accepts every reservation type", () => {
    for (const reservationType of HISTORY_VALID_TYPES) {
      expect(
        parseReservationHistoryType(reservationType)
      ).toBe(reservationType);
    }
  });

  it("takes the first value of a repeated param", () => {
    expect(
      parseReservationHistoryType([
        RESERVATION_TYPE.RENTAL,
        RESERVATION_TYPE.TOUR,
      ])
    ).toBe(RESERVATION_TYPE.RENTAL);
  });

  it("ignores unknown types", () => {
    for (const rawType of HISTORY_INVALID_TYPES) {
      expect(
        parseReservationHistoryType(rawType)
      ).toBeNull();
    }
  });

  it("ignores an absent param", () => {
    expect(
      parseReservationHistoryType(undefined)
    ).toBeNull();
  });
});
