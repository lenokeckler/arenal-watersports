import { describe, expect, it } from "vitest";
import {
  INVALID_DATE,
  INVALID_TIME,
  EXPECTED_DURATION_MINUTES,
  EXPECTED_TRIMMED_CUSTOMER_NAME,
  EARLY_VALID_DATE,
  FRACTIONAL_COUNT,
  INVALID_FIELD_COUNT,
  INVALID_QUANTITY,
  SUBMINUTE_DURATION_HOURS,
  VALID_RESERVATION_FORM_INPUT,
} from "./validateReservationFormInput.constants";
import { validateReservationFormInput } from "../utils/validateReservationFormInput";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";

describe("validateReservationFormInput", () => {
  it("trims the customer name and converts hours to whole minutes", () => {
    const result = validateReservationFormInput(
      VALID_RESERVATION_FORM_INPUT
    );

    expect(result.value).toEqual({
      categoryId: VALID_RESERVATION_FORM_INPUT.categoryId,
      customerName: EXPECTED_TRIMMED_CUSTOMER_NAME,
      date: VALID_RESERVATION_FORM_INPUT.date,
      durationMinutes: EXPECTED_DURATION_MINUTES,
      peopleCount: VALID_RESERVATION_FORM_INPUT.peopleCount,
      quantity: VALID_RESERVATION_FORM_INPUT.quantity,
      time: VALID_RESERVATION_FORM_INPUT.time,
    });
    expect(result.errors).toEqual({});
  });

  it("rejects impossible civil dates and times", () => {
    const result = validateReservationFormInput({
      ...VALID_RESERVATION_FORM_INPUT,
      date: INVALID_DATE,
      time: INVALID_TIME,
    });

    expect(result.value).toBeNull();
    expect(result.errors).toHaveProperty(
      RESERVATION_FORM_FIELD.DATE
    );
    expect(result.errors).toHaveProperty(
      RESERVATION_FORM_FIELD.TIME
    );
  });

  it("accepts civil dates in years below one hundred", () => {
    const result = validateReservationFormInput({
      ...VALID_RESERVATION_FORM_INPUT,
      date: EARLY_VALID_DATE,
    });

    expect(result.value?.date).toBe(EARLY_VALID_DATE);
    expect(result.errors).toEqual({});
  });

  it("rejects a duration that cannot convert to whole minutes", () => {
    const result = validateReservationFormInput({
      ...VALID_RESERVATION_FORM_INPUT,
      durationHours: SUBMINUTE_DURATION_HOURS,
    });

    expect(result.value).toBeNull();
    expect(result.errors).toHaveProperty(
      RESERVATION_FORM_FIELD.DURATION_HOURS
    );
  });

  it("rejects non-positive or fractional counts and missing fields", () => {
    const result = validateReservationFormInput({
      ...VALID_RESERVATION_FORM_INPUT,
      categoryId: " ",
      customerName: " ",
      peopleCount: FRACTIONAL_COUNT,
      quantity: INVALID_QUANTITY,
    });

    expect(result.value).toBeNull();
    expect(Object.keys(result.errors)).toHaveLength(
      INVALID_FIELD_COUNT
    );
  });
});
