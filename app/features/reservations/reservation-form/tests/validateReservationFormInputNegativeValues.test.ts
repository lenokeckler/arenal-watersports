import { describe, expect, it } from "vitest";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { validateReservationFormInput } from "../utils/validateReservationFormInput";
import {
  NEGATIVE_VALUE,
  VALID_RESERVATION_FORM_INPUT,
} from "./validateReservationFormInput.constants";

describe("validateReservationFormInput negative values", () => {
  it("rejects negative people, equipment, and duration values", () => {
    const negativePeopleResult =
      validateReservationFormInput({
        ...VALID_RESERVATION_FORM_INPUT,
        peopleCount: NEGATIVE_VALUE,
      });
    const negativeQuantityResult =
      validateReservationFormInput({
        ...VALID_RESERVATION_FORM_INPUT,
        quantity: NEGATIVE_VALUE,
      });
    const negativeDurationResult =
      validateReservationFormInput({
        ...VALID_RESERVATION_FORM_INPUT,
        durationHours: NEGATIVE_VALUE,
      });

    expect(negativePeopleResult.errors).toHaveProperty(
      RESERVATION_FORM_FIELD.PEOPLE_COUNT
    );
    expect(negativeQuantityResult.errors).toHaveProperty(
      RESERVATION_FORM_FIELD.QUANTITY
    );
    expect(negativeDurationResult.errors).toHaveProperty(
      RESERVATION_FORM_FIELD.DURATION_HOURS
    );
  });
});
