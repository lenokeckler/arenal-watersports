import { describe, expect, it } from "vitest";
import { formatReservationWindow } from "../utils/formatReservationWindow";
import { RESERVATION_WINDOW } from "./CategoryUnits.constants";

describe("formatReservationWindow", () => {
  it("joins start and end times in Costa Rica time", () => {
    expect(
      formatReservationWindow(
        RESERVATION_WINDOW.STARTS_AT,
        RESERVATION_WINDOW.ENDS_AT
      )
    ).toBe(RESERVATION_WINDOW.EXPECTED);
  });
});
