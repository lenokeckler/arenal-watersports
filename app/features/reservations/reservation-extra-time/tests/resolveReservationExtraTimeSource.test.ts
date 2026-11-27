import { describe, expect, it } from "vitest";
import { RESERVATION_EXTRA_TIME_SOURCE as SOURCE } from "../constants/ReservationExtraTimeSource.constants";
import { resolveReservationExtraTimeSource } from "../utils/resolveReservationExtraTimeSource";
import {
  EXTRA_TIME_EXTENDED_MINUTES,
  EXTRA_TIME_NONE,
  EXTRA_TIME_OVERDUE_MINUTES,
} from "./ReservationExtraTime.constants";

describe("resolveReservationExtraTimeSource", () => {
  it.each([
    [
      "went over without an extension",
      EXTRA_TIME_OVERDUE_MINUTES,
      EXTRA_TIME_NONE,
      SOURCE.OVERDUE,
    ],
    [
      "went over after an extension",
      EXTRA_TIME_OVERDUE_MINUTES,
      EXTRA_TIME_EXTENDED_MINUTES,
      SOURCE.EXTENDED,
    ],
    [
      "came back on time",
      EXTRA_TIME_NONE,
      EXTRA_TIME_NONE,
      SOURCE.ON_TIME,
    ],
    [
      "was extended but came back before the planned return",
      EXTRA_TIME_NONE,
      EXTRA_TIME_EXTENDED_MINUTES,
      SOURCE.ON_TIME,
    ],
  ])(
    "names the source when the group %s",
    (_, extraMinutes, extendedMinutes, expected) => {
      expect(
        resolveReservationExtraTimeSource(
          extraMinutes,
          extendedMinutes
        )
      ).toBe(expected);
    }
  );
});
