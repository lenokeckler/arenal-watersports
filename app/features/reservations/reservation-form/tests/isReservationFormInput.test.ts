import { describe, expect, it } from "vitest";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
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

  it("rejects an unsupported reservation type", () => {
    const malformedInput = {
      ...VALID_RESERVATION_FORM_INPUT,
      reservationType: "unsupported",
    };

    expect(isReservationFormInput(malformedInput)).toBe(
      false
    );
    expect(
      isReservationFormInput({
        ...VALID_RESERVATION_FORM_INPUT,
        reservationType: RESERVATION_TYPE.TOUR,
      })
    ).toBe(true);
  });

  it("rejects guide identifiers with invalid boundary types", () => {
    expect(
      isReservationFormInput({
        ...VALID_RESERVATION_FORM_INPUT,
        guideIds: ["guide-id", 1],
      })
    ).toBe(false);
  });
});
