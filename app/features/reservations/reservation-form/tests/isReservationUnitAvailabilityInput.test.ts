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

  it("accepts a reservation id to exclude, or none at all", () => {
    expect(
      isReservationUnitAvailabilityInput({
        ...RESERVATION_AVAILABILITY_INPUT_FIXTURE,
        excludeReservationId:
          AVAILABLE_UNIT_TEST.EXCLUDED_RESERVATION_ID,
      })
    ).toBe(true);
    expect(
      isReservationUnitAvailabilityInput({
        ...RESERVATION_AVAILABILITY_INPUT_FIXTURE,
        excludeReservationId: undefined,
      })
    ).toBe(true);
  });

  it("rejects an excluded reservation id that is not a uuid", () => {
    expect(
      isReservationUnitAvailabilityInput({
        ...RESERVATION_AVAILABILITY_INPUT_FIXTURE,
        excludeReservationId: AVAILABLE_UNIT_TEST.DATE,
      })
    ).toBe(false);
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
