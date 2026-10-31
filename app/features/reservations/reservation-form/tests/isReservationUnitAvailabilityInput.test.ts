import { describe, expect, it } from "vitest";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";
import { RESERVATION_AVAILABILITY_INPUT_FIXTURE } from "./getAvailableReservationUnits.constants";

describe("isReservationUnitAvailabilityInput", () => {
  it("accepts a complete valid request", () => {
    expect(
      isReservationUnitAvailabilityInput(
        RESERVATION_AVAILABILITY_INPUT_FIXTURE
      )
    ).toBe(true);
  });

  it("rejects null, arrays, and incomplete requests", () => {
    expect(isReservationUnitAvailabilityInput(null)).toBe(
      false
    );
    expect(isReservationUnitAvailabilityInput([])).toBe(
      false
    );
    expect(
      isReservationUnitAvailabilityInput({
        categoryId:
          RESERVATION_AVAILABILITY_INPUT_FIXTURE.categoryId,
      })
    ).toBe(false);
  });
});
