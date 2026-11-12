import { describe, expect, it } from "vitest";
import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import { isReservationPostponementInput } from "../utils/isReservationPostponementInput";
import {
  MALFORMED_INPUT_CASES,
  UNDECLARED_KEY,
  UPPERCASE_ITEM_ID,
  UPPERCASE_RESERVATION_ID,
} from "./isReservationPostponementInput.constants";
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

  it("accepts a reading whose measures are explicitly undefined", () => {
    expect(
      isReservationPostponementInput({
        ...VALID_POSTPONEMENT_INPUT,
        readings: [
          {
            ...VALID_POSTPONEMENT_INPUT.readings[0],
            fuelIn: undefined,
            usageIn: undefined,
          },
        ],
      })
    ).toBe(true);
  });

  it("accepts an empty readings list", () => {
    expect(
      isReservationPostponementInput({
        ...VALID_POSTPONEMENT_INPUT,
        readings: [],
      })
    ).toBe(true);
  });

  it("accepts uppercase uuids", () => {
    expect(
      isReservationPostponementInput({
        ...VALID_POSTPONEMENT_INPUT,
        reservationId: UPPERCASE_RESERVATION_ID,
        readings: [
          {
            ...VALID_POSTPONEMENT_INPUT.readings[0],
            itemId: UPPERCASE_ITEM_ID,
          },
        ],
      })
    ).toBe(true);
  });

  it("accepts an input carrying an undeclared key", () => {
    expect(
      isReservationPostponementInput({
        ...VALID_POSTPONEMENT_INPUT,
        [UNDECLARED_KEY]: true,
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
