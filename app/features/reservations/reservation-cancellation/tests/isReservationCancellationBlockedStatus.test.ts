import { describe, expect, it } from "vitest";
import { isReservationCancellationBlockedStatus } from "../utils/isReservationCancellationBlockedStatus";
import { NOT_CANCELLABLE_STATUSES } from "./ReservationCancellation.constants";

describe("isReservationCancellationBlockedStatus", () => {
  it.each(NOT_CANCELLABLE_STATUSES)(
    "blocks a %s reservation",
    (status) => {
      expect(
        isReservationCancellationBlockedStatus(status)
      ).toBe(true);
    }
  );

  it.each(["scheduled", "dispatched"] as const)(
    "does not block a %s reservation",
    (status) => {
      expect(
        isReservationCancellationBlockedStatus(status)
      ).toBe(false);
    }
  );
});
