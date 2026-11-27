import { describe, expect, it } from "vitest";
import { RESERVATION_DEPOSIT_ERROR } from "../constants/ReservationDepositError.constants";
import { RESERVATION_DEPOSIT_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationDepositFeedbackCopy.constants";
import { RESERVATION_DEPOSIT_REFUSALS } from "../constants/ReservationDepositRefusals.constants";
import { mapReservationDepositError } from "../utils/mapReservationDepositError";
import {
  DEPOSIT_NON_ERROR_THROWN,
  DEPOSIT_POSTGRES_PREFIX,
  DEPOSIT_SUPABASE_WRAP_PREFIX,
  DEPOSIT_SUPABASE_WRAP_SUFFIX,
  DEPOSIT_UNEXPECTED_ERROR,
} from "./ReservationDepositAction.constants";

const { MESSAGE } = RESERVATION_DEPOSIT_ERROR;

describe("mapReservationDepositError", () => {
  it.each(RESERVATION_DEPOSIT_REFUSALS)(
    "maps the refusal $message",
    ({ errors, formError, message }) => {
      expect(
        mapReservationDepositError(
          new Error(`${DEPOSIT_POSTGRES_PREFIX}${message}`)
        )
      ).toEqual({
        ok: false,
        errors: { ...errors },
        formError,
      });
    }
  );

  it("has a refusal row for every message the database can raise", () => {
    expect(
      RESERVATION_DEPOSIT_REFUSALS.map(
        ({ message }) => message
      ).toSorted()
    ).toEqual(Object.values(MESSAGE).toSorted());
  });

  it("puts an invalid amount on the amount field", () => {
    expect(
      mapReservationDepositError(
        new Error(MESSAGE.AMOUNT_INVALID)
      )
    ).toMatchObject({
      errors: { amount: expect.any(String) },
      formError: undefined,
    });
  });

  it("explains a decision taken in another tab", () => {
    expect(
      mapReservationDepositError(
        new Error(MESSAGE.ALREADY_DECIDED)
      )
    ).toMatchObject({
      formError: FEEDBACK.ALREADY_DECIDED,
    });
  });

  it("maps a refusal wrapped by the supabase error", () => {
    const wrapped = new Error(
      `${DEPOSIT_SUPABASE_WRAP_PREFIX}${RESERVATION_DEPOSIT_ERROR.OPERATION.RECORD}: ${MESSAGE.NOT_FOUND}${DEPOSIT_SUPABASE_WRAP_SUFFIX}`
    );

    expect(
      mapReservationDepositError(wrapped)
    ).toMatchObject({
      ok: false,
      formError: FEEDBACK.NOT_FOUND,
    });
  });

  it("rethrows an unknown failure", () => {
    expect(() =>
      mapReservationDepositError(DEPOSIT_UNEXPECTED_ERROR)
    ).toThrow(DEPOSIT_UNEXPECTED_ERROR);
  });

  it("rethrows what is not an error", () => {
    expect(() =>
      mapReservationDepositError(DEPOSIT_NON_ERROR_THROWN)
    ).toThrow(DEPOSIT_NON_ERROR_THROWN);
  });
});
