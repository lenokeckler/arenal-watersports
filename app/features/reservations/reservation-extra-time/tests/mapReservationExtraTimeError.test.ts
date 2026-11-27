import { describe, expect, it } from "vitest";
import { MONEY_AMOUNT_ISSUE } from "@/app/constants";
import { RESERVATION_EXTRA_TIME_ERROR } from "../constants/ReservationExtraTimeError.constants";
import { RESERVATION_EXTRA_TIME_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationExtraTimeFeedbackCopy.constants";
import { RESERVATION_EXTRA_TIME_VALIDATION_COPY as VALIDATION } from "../constants/ReservationExtraTimeValidationCopy.constants";
import { mapReservationExtraTimeError } from "../utils/mapReservationExtraTimeError";

const { MESSAGE } = RESERVATION_EXTRA_TIME_ERROR;

describe("mapReservationExtraTimeError", () => {
  it.each([
    [MESSAGE.ACCESS_REQUIRED, {}, FEEDBACK.FORBIDDEN],
    [
      MESSAGE.ALREADY_RESOLVED,
      {},
      FEEDBACK.ALREADY_RESOLVED,
    ],
    [MESSAGE.GROUPS_OUT, {}, FEEDBACK.GROUPS_OUT],
    [MESSAGE.NO_EXTRA_TIME, {}, FEEDBACK.NO_EXTRA_TIME],
    [MESSAGE.NOT_FOUND, {}, FEEDBACK.NOT_FOUND],
    [
      MESSAGE.PAYLOAD_INVALID,
      {},
      FEEDBACK.REQUEST_REJECTED,
    ],
    [
      MESSAGE.COURTESY_WITH_CHARGE,
      {},
      FEEDBACK.REQUEST_REJECTED,
    ],
    [
      MESSAGE.AMOUNT_INVALID,
      {
        amount:
          VALIDATION.AMOUNT[MONEY_AMOUNT_ISSUE.FORMAT],
      },
      undefined,
    ],
    [
      MESSAGE.METHOD_REQUIRED,
      { paymentChoice: VALIDATION.CHOICE_REQUIRED },
      undefined,
    ],
    [
      MESSAGE.METHOD_TOO_LONG,
      { otherPaymentMethod: VALIDATION.METHOD_TOO_LONG },
      undefined,
    ],
    [
      MESSAGE.OUTCOME_INVALID,
      { outcome: VALIDATION.OUTCOME_REQUIRED },
      undefined,
    ],
  ])(
    "maps the database message %s",
    (message, errors, formError) => {
      expect(
        mapReservationExtraTimeError(new Error(message))
      ).toEqual({
        errors,
        formError,
        ok: false,
      });
    }
  );

  it("rethrows an unknown error", () => {
    const error = new Error("connection reset");
    expect(() =>
      mapReservationExtraTimeError(error)
    ).toThrow(error);
  });

  it("rethrows a value that is not an error", () => {
    expect(() =>
      mapReservationExtraTimeError(MESSAGE.NOT_FOUND)
    ).toThrow();
  });
});
