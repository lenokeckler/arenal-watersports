import { describe, expect, it } from "vitest";
import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import { isReservationPostponementInput } from "../utils/isReservationPostponementInput";
import { MALFORMED_INPUT_CASES } from "./isReservationPostponementInput.constants";
import { VALID_POSTPONEMENT_INPUT } from "./ReservationPostponementInput.constants";

describe("isReservationPostponementInput", () => {
  it("accepts a correctly shaped postponement input", () => {
    expect(
      isReservationPostponementInput(
        VALID_POSTPONEMENT_INPUT
      )
    ).toBe(true);
  });

  it.each(Object.values(RESERVATION_POSTPONEMENT_CAUSE))(
    "accepts the cause %s",
    (cause) => {
      expect(
        isReservationPostponementInput({
          ...VALID_POSTPONEMENT_INPUT,
          cause,
        })
      ).toBe(true);
    }
  );

  it("accepts a reading with a null measure", () => {
    expect(
      isReservationPostponementInput({
        ...VALID_POSTPONEMENT_INPUT,
        readings: [
          {
            ...VALID_POSTPONEMENT_INPUT.readings[0],
            fuelIn: null,
          },
        ],
      })
    ).toBe(true);
  });

  it.each(MALFORMED_INPUT_CASES)(
    "rejects %s",
    (_name, input) => {
      expect(isReservationPostponementInput(input)).toBe(
        false
      );
    }
  );
});
