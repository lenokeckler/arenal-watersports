import { describe, expect, it } from "vitest";
import { mapReservationCancellation } from "../utils/mapReservationCancellation";
import {
  DISPATCHED_ROW,
  EXPECTED_DISPATCHED,
  EXPECTED_SCHEDULED,
  NOT_CANCELLABLE_STATUSES,
  SCHEDULED_ROW,
} from "./ReservationCancellation.constants";

describe("mapReservationCancellation", () => {
  it("maps a scheduled reservation with its Costa Rica date and equipment, extras left out", () => {
    expect(
      mapReservationCancellation(SCHEDULED_ROW)
    ).toEqual(EXPECTED_SCHEDULED);
  });

  it("marks a dispatched reservation as cancellable and requiring a cause", () => {
    expect(
      mapReservationCancellation(DISPATCHED_ROW)
    ).toEqual(EXPECTED_DISPATCHED);
  });

  it("does not require a cause for a scheduled reservation", () => {
    expect(
      mapReservationCancellation(SCHEDULED_ROW)
        .requiresCause
    ).toBe(false);
  });

  it.each(NOT_CANCELLABLE_STATUSES)(
    "marks a %s reservation as not cancellable",
    (status) => {
      expect(
        mapReservationCancellation({
          ...SCHEDULED_ROW,
          status,
        }).isCancellable
      ).toBe(false);
    }
  );
});
