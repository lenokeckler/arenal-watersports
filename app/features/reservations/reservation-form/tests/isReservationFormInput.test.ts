import { describe, expect, it } from "vitest";
import {
  INVALID_QUANTITY_TYPE,
  VALID_RESERVATION_FORM_INPUT,
} from "./reservationFormUtils.constants";
import { isReservationFormInput } from "../utils/isReservationFormInput";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";

const VALID_EXTRA_ID =
  "f3200000-0000-4000-8000-000000000001";

describe("isReservationFormInput", () => {
  it("accepts a correctly shaped reservation form input", () => {
    expect(
      isReservationFormInput(VALID_RESERVATION_FORM_INPUT)
    ).toBe(true);
  });

  it("rejects a quantity whose boundary type is invalid", () => {
    const malformedInput = {
      ...VALID_RESERVATION_FORM_INPUT,
      quantity: INVALID_QUANTITY_TYPE,
    };

    expect(isReservationFormInput(malformedInput)).toBe(
      false
    );
  });

  it("rejects an unknown reservation type", () => {
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

  it.each([
    { extraIds: "not-a-list" },
    { extraIds: [null] },
    { extraIds: ["malformed"] },
    {
      extraIds: [VALID_EXTRA_ID, VALID_EXTRA_ID],
    },
    {
      extraIds: [
        VALID_EXTRA_ID,
        "F3200000-0000-4000-8000-000000000001",
      ],
    },
  ])(
    "rejects malformed or duplicate extra identifiers",
    (fields) => {
      expect(
        isReservationFormInput({
          ...VALID_RESERVATION_FORM_INPUT,
          ...fields,
        })
      ).toBe(false);
    }
  );

  it("accepts a unique list of UUID extra identifiers", () => {
    expect(
      isReservationFormInput({
        ...VALID_RESERVATION_FORM_INPUT,
        extraIds: [VALID_EXTRA_ID],
      })
    ).toBe(true);
  });
});
