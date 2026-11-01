import { describe, expect, it } from "vitest";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";
import {
  AVAILABLE_UNIT_TEST,
  RESERVATION_AVAILABILITY_INPUT_FIXTURE,
} from "./getAvailableReservationUnits.constants";

describe("isReservationUnitAvailabilityInput", () => {
  it("accepts a complete valid request", () => {
    expect(
      isReservationUnitAvailabilityInput(
        RESERVATION_AVAILABILITY_INPUT_FIXTURE
      )
    ).toBe(true);
  });

  it.each([
    [AVAILABLE_UNIT_TEST.EXCLUDED_RESERVATION_ID, true],
    [undefined, true],
    [AVAILABLE_UNIT_TEST.DATE, false],
  ])(
    "checks the excluded reservation id %s",
    (id, isValid) => {
      expect(
        isReservationUnitAvailabilityInput({
          ...RESERVATION_AVAILABILITY_INPUT_FIXTURE,
          excludeReservationId: id,
        })
      ).toBe(isValid);
    }
  );

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
