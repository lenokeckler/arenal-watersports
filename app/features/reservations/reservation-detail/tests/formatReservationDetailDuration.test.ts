import { describe, expect, it } from "vitest";
import { formatReservationDetailDuration } from "../utils/formatReservationDetailDuration";
import { RESERVATION_DETAIL_DURATION_TEST as test } from "./ReservationDetailDurationTest.constants";

describe("formatReservationDetailDuration", () => {
  it("formats durations shorter than an hour", () => {
    expect(
      formatReservationDetailDuration(
        test.UNDER_HOUR_MINUTES
      )
    ).toBe(test.UNDER_HOUR_EXPECTED);
  });

  it("formats durations with hours and remaining minutes", () => {
    expect(
      formatReservationDetailDuration(
        test.MIXED_DURATION_MINUTES
      )
    ).toBe(test.MIXED_DURATION_EXPECTED);
  });
});
