import { describe, expect, it } from "vitest";
import { RESERVATION_CHARGE_ERROR } from "../constants/ReservationChargeError.constants";
import { RESERVATION_CHARGE_FEEDBACK_COPY as COPY } from "../constants/ReservationChargeFeedbackCopy.constants";
import { RESERVATION_CHARGE_REFUSALS } from "../constants/ReservationChargeRefusals.constants";
import { mapReservationChargeError } from "../utils/mapReservationChargeError";
import {
  CHARGE_POSTGRES_PREFIX,
  CHARGE_UNEXPECTED_ERROR,
  PARTS_INVALID_POSTGRES_MESSAGE,
} from "./ReservationChargeAction.constants";

describe("mapReservationChargeError", () => {
  it.each(RESERVATION_CHARGE_REFUSALS)(
    "maps the refusal $message",
    ({ errors, formError, message }) => {
      expect(
        mapReservationChargeError(
          new Error(`${CHARGE_POSTGRES_PREFIX}${message}`)
        )
      ).toEqual({
        ok: false,
        errors: { ...errors },
        formError,
      });
    }
  );

  it("covers every message the database can raise", () => {
    const mapped = RESERVATION_CHARGE_REFUSALS.map(
      ({ message }) => message
    );

    expect(mapped.toSorted()).toEqual(
      Object.values(
        RESERVATION_CHARGE_ERROR.MESSAGE
      ).toSorted()
    );
  });

  it("maps invalid charge parts to the generic form error", () => {
    expect(
      mapReservationChargeError(
        new Error(PARTS_INVALID_POSTGRES_MESSAGE)
      )
    ).toEqual({
      ok: false,
      errors: {},
      formError: COPY.GENERIC,
    });
  });

  it("rethrows an unknown failure", () => {
    expect(() =>
      mapReservationChargeError(CHARGE_UNEXPECTED_ERROR)
    ).toThrow(CHARGE_UNEXPECTED_ERROR);
  });

  it("rethrows what is not an error", () => {
    expect(() =>
      mapReservationChargeError(CHARGE_POSTGRES_PREFIX)
    ).toThrow();
  });

  it("maps a refusal wrapped by the supabase error", () => {
    const wrapped = new Error(
      `Supabase query failed: record reservation charge � ${RESERVATION_CHARGE_ERROR.MESSAGE.NOT_FOUND} (P0001)`
    );

    expect(
      mapReservationChargeError(wrapped)
    ).toMatchObject({ ok: false });
  });
});
