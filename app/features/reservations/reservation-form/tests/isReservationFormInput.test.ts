import { describe, expect, it } from "vitest";
import { VALID_RESERVATION_FORM_INPUT } from "./reservationFormUtils.constants";
import { isReservationFormInput } from "../utils/isReservationFormInput";

describe("isReservationFormInput", () => {
  it("accepts a correctly shaped reservation form input", () => {
    expect(
      isReservationFormInput(VALID_RESERVATION_FORM_INPUT)
    ).toBe(true);
  });

  it("rejects a quantity whose boundary type is invalid", () => {
    const malformedInput = {
      ...VALID_RESERVATION_FORM_INPUT,
      quantity: String(
        VALID_RESERVATION_FORM_INPUT.quantity
      ),
    };

    expect(isReservationFormInput(malformedInput)).toBe(
      false
    );
  });
});
