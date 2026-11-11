import { describe, expect, it } from "vitest";
import { mapReservationCancellation } from "../utils/mapReservationCancellation";
import {
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
