import { describe, expect, it } from "vitest";
import { RESERVATION_STATUS } from "@/app/constants";
import { RESERVATION_EXTRA_TIME_OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import { RESERVATION_EXTRA_TIME_UNAVAILABLE_REASON as REASON } from "../constants/ReservationExtraTimeUnavailableReason.constants";
import { resolveReservationExtraTimeUnavailableReason } from "../utils/resolveReservationExtraTimeUnavailableReason";
import {
  EXTRA_TIME_NONE,
  EXTRA_TIME_TOTAL_MINUTES,
} from "./ReservationExtraTime.constants";

const RESOLVED = {
  extraMinutes: EXTRA_TIME_TOTAL_MINUTES,
  outcome: RESERVATION_EXTRA_TIME_OUTCOME.CHARGED,
};

describe("resolveReservationExtraTimeUnavailableReason", () => {
  it.each([
    [
      "cancelled",
      RESERVATION_STATUS.CANCELLED,
      null,
      EXTRA_TIME_TOTAL_MINUTES,
      REASON.CANCELLED,
    ],
    [
      "scheduled",
      RESERVATION_STATUS.SCHEDULED,
      null,
      EXTRA_TIME_NONE,
      REASON.GROUPS_OUT,
    ],
    [
      "still out",
      RESERVATION_STATUS.DISPATCHED,
      null,
      EXTRA_TIME_TOTAL_MINUTES,
      REASON.GROUPS_OUT,
    ],
    [
      "already resolved",
      RESERVATION_STATUS.CLOSED,
      RESOLVED,
      EXTRA_TIME_TOTAL_MINUTES,
      REASON.RESOLVED,
    ],
    [
      "back on time",
      RESERVATION_STATUS.CLOSED,
      null,
      EXTRA_TIME_NONE,
      REASON.NO_EXTRA_TIME,
    ],
    [
      "closed with extra time",
      RESERVATION_STATUS.CLOSED,
      null,
      EXTRA_TIME_TOTAL_MINUTES,
      null,
    ],
  ])(
    "returns the reason for a reservation %s",
    (_, status, resolution, totalMinutes, expected) => {
      expect(
        resolveReservationExtraTimeUnavailableReason({
          resolution,
          status,
          totalMinutes,
        })
      ).toBe(expected);
    }
  );
});
