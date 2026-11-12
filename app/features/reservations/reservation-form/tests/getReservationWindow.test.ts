import { describe, expect, it } from "vitest";
import { getReservationWindow } from "../utils/getReservationWindow";
import { AVAILABLE_UNIT_TEST } from "./getAvailableReservationUnits.constants";

describe("getReservationWindow", () => {
  it("interprets the selected date and time in Costa Rica", () => {
    expect(
      getReservationWindow({
        categoryId: AVAILABLE_UNIT_TEST.CATEGORY_ID,
        date: AVAILABLE_UNIT_TEST.DATE,
        durationMinutes:
          AVAILABLE_UNIT_TEST.DURATION_MINUTES,
        time: AVAILABLE_UNIT_TEST.TIME,
      })
    ).toEqual({
      endsAt: AVAILABLE_UNIT_TEST.ENDS_AT,
      startsAt: AVAILABLE_UNIT_TEST.STARTS_AT,
    });
  });
});
