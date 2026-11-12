import { describe, expect, it } from "vitest";
import { formatReservationChargeDuration } from "../utils/formatReservationChargeDuration";
import { EXPECTED_SCHEDULED } from "./ReservationCharge.constants";
import {
  EXPECTED_DURATION,
  EXPECTED_ONLY_MINUTES,
  EXPECTED_WHOLE_HOURS,
  ONLY_MINUTES,
  WHOLE_HOURS_MINUTES,
} from "./ReservationChargeScreen.constants";

describe("formatReservationChargeDuration", () => {
  it.each([
    [WHOLE_HOURS_MINUTES, EXPECTED_WHOLE_HOURS],
    [ONLY_MINUTES, EXPECTED_ONLY_MINUTES],
    [EXPECTED_SCHEDULED.durationMinutes, EXPECTED_DURATION],
  ])("formats %i minutes as %s", (minutes, expected) => {
    expect(formatReservationChargeDuration(minutes)).toBe(
      expected
    );
  });
});
