import { describe, expect, it } from "vitest";
import { isReservationCancellationBlockedStatus } from "../utils/isReservationCancellationBlockedStatus";
import { BLOCKED_STATUSES } from "./ReservationCancellation.constants";

describe("isReservationCancellationBlockedStatus", () => {
  it.each(BLOCKED_STATUSES)(
    "blocks a %s reservation",
    (status) => {
      expect(
        isReservationCancellationBlockedStatus(status)
      ).toBe(true);
    }
  );

  it.each(["scheduled"] as const)(
    "does not block a %s reservation",
    (status) => {
      expect(
        isReservationCancellationBlockedStatus(status)
      ).toBe(false);
    }
  );
});
