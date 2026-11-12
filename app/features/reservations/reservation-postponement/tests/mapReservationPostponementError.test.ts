import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_ERROR } from "../constants/ReservationPostponementError.constants";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY } from "../constants/ReservationPostponementFeedbackCopy.constants";
import { RESERVATION_POSTPONEMENT_REFUSALS } from "../constants/ReservationPostponementRefusals.constants";
import { mapReservationPostponementError } from "../utils/mapReservationPostponementError";
import {
  DATABASE_MESSAGES,
  FIELD_REFUSAL_CASES,
  FORM_REFUSAL_CASES,
  READING_ITEM_ID,
  READING_REFUSAL_CASES,
  UNMAPPED_MESSAGE,
  buildRaisedError,
} from "./mapReservationPostponementError.constants";

describe("mapReservationPostponementError", () => {
  it.each(DATABASE_MESSAGES)(
    "has a refusal for the database message %s",
    (message) => {
      expect(
        RESERVATION_POSTPONEMENT_REFUSALS.some(
          (refusal) => refusal.message === message
        )
      ).toBe(true);
    }
  );

  it.each(FORM_REFUSAL_CASES)(
    "maps the refusal %s to a form error",
    (message, formError) => {
      expect(
        mapReservationPostponementError(
          buildRaisedError(message, STRING.Empty)
        )
      ).toEqual({
        ok: false,
        errors: { readings: {} },
        formError,
      });
    }
  );

  it.each(FIELD_REFUSAL_CASES)(
    "maps the refusal %s to its field",
    (message, errors) => {
      expect(
        mapReservationPostponementError(
          new Error(`${message}`)
        )
      ).toEqual({
        ok: false,
        errors: { ...errors, readings: {} },
      });
    }
  );

  it.each(READING_REFUSAL_CASES)(
    "attaches the refusal %s to the reading of the item in its detail",
    (message, reading) => {
      expect(
        mapReservationPostponementError(
          buildRaisedError(`${message}`, READING_ITEM_ID)
        )
      ).toEqual({
        ok: false,
        errors: {
          readings: { [READING_ITEM_ID]: reading },
        },
      });
    }
  );

  it.each(READING_REFUSAL_CASES)(
    "falls back to a form error for the refusal %s without a detail",
    (message) => {
      expect(
        mapReservationPostponementError(
          buildRaisedError(`${message}`, STRING.Empty)
        )
      ).toEqual({
        ok: false,
        errors: { readings: {} },
        formError:
          RESERVATION_POSTPONEMENT_FEEDBACK_COPY.READINGS_REQUIRED,
      });
    }
  );

  it("falls back to a form error when the error carries no database detail", () => {
    expect(
      mapReservationPostponementError(
        new Error(
          RESERVATION_POSTPONEMENT_ERROR.MESSAGE
            .FUEL_INVALID
        )
      )
    ).toEqual({
      ok: false,
      errors: { readings: {} },
      formError:
        RESERVATION_POSTPONEMENT_FEEDBACK_COPY.READINGS_REQUIRED,
    });
  });

  it("rethrows an error with no mapping", () => {
    const error = new Error(UNMAPPED_MESSAGE);

    expect(() =>
      mapReservationPostponementError(error)
    ).toThrow(error);
  });

  it("rethrows a value that is not an error", () => {
    expect(() =>
      mapReservationPostponementError(UNMAPPED_MESSAGE)
    ).toThrow(UNMAPPED_MESSAGE);
  });
});
