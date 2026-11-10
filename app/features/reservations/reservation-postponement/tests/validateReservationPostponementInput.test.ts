import { describe, expect, it } from "vitest";
import { validateReservationPostponementInput } from "../utils/validateReservationPostponementInput";
import { VALID_POSTPONEMENT_INPUT } from "./ReservationPostponementInput.constants";
import {
  ACCEPTED_CASES,
  FIELD_ERROR_CASES,
} from "./validateReservationPostponementInput.constants";

describe("validateReservationPostponementInput", () => {
  it.each(ACCEPTED_CASES)(
    "accepts %s",
    (_name, overrides) => {
      expect(
        validateReservationPostponementInput({
          ...VALID_POSTPONEMENT_INPUT,
          ...overrides,
        })
      ).toBeNull();
    }
  );

  it.each(FIELD_ERROR_CASES)(
    "reports %s on its field",
    (_name, overrides, expected) => {
      expect(
        validateReservationPostponementInput({
          ...VALID_POSTPONEMENT_INPUT,
          ...overrides,
        })
      ).toEqual({ ...expected, readings: {} });
    }
  );
});
