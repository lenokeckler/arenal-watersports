import { describe, expect, it } from "vitest";
import { RESERVATION_EDIT_COPY as copy } from "../constants/ReservationEditCopy.constants";
import { RESERVATION_SERVICE_OPERATION as operation } from "../constants/ReservationServiceOperation.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { mapReservationEditError } from "../utils/mapReservationEditError";
import { RESERVATION_EDIT_TEST } from "./ReservationEdit.constants";

const formFailure = (formError: string) => ({
  errors: {},
  formError,
  ok: false,
});

const UNIT_FAILURE = {
  ...formFailure(copy.UNIT_UNAVAILABLE),
  unitUnavailable: true,
};

describe("mapReservationEditError", () => {
  it.each([
    [
      operation.RESERVATION_NOT_FOUND,
      formFailure(copy.NOT_FOUND),
    ],
    [
      operation.RESERVATION_NOT_SCHEDULED,
      formFailure(copy.NOT_MODIFIABLE),
    ],
    [operation.RESERVATION_STALE, formFailure(copy.STALE)],
    [
      operation.COMBO_EQUIPMENT_LOCKED,
      formFailure(copy.COMBO_LOCKED),
    ],
    [
      operation.MULTIPLE_EQUIPMENT_LOCKED,
      formFailure(copy.MULTIPLE_ITEMS_LOCKED),
    ],
    [operation.UNIT_UNAVAILABLE, UNIT_FAILURE],
    [operation.UNIT_CONFLICT, UNIT_FAILURE],
    [
      operation.CATEGORY_UNAVAILABLE,
      {
        errors: {
          [RESERVATION_FORM_FIELD.CATEGORY_ID]:
            copy.CATEGORY_UNAVAILABLE,
        },
        ok: false,
      },
    ],
  ])("maps %s", (message, result) => {
    expect(
      mapReservationEditError(new Error(message))
    ).toEqual(result);
  });

  it("rethrows an unknown failure", () => {
    const failure = new Error(
      RESERVATION_EDIT_TEST.UNKNOWN_ERROR
    );

    expect(() => mapReservationEditError(failure)).toThrow(
      failure
    );
  });
});
