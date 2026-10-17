import { describe, expect, it } from "vitest";
import {
  INVALID_DATE,
  INVALID_TIME,
  EXPECTED_DURATION_MINUTES,
  EXPECTED_TRIMMED_CUSTOMER_NAME,
  CONCRETE_UNIT_ID,
  EARLY_VALID_DATE,
  FRACTIONAL_COUNT,
  INVALID_FIELD_COUNT,
  INVALID_QUANTITY,
  NEGATIVE_VALUE,
  SUBMINUTE_DURATION_HOURS,
  ZERO_DURATION_HOURS,
  VALID_RESERVATION_FORM_INPUT,
} from "./validateReservationFormInput.constants";
import { validateReservationFormInput } from "../utils/validateReservationFormInput";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";

describe("validateReservationFormInput", () => {
  it("trims the customer name and converts hours to whole minutes", () => {
    const result = validateReservationFormInput(
      VALID_RESERVATION_FORM_INPUT
    );

    expect(result.value).toEqual({
      customerName: EXPECTED_TRIMMED_CUSTOMER_NAME,
      date: VALID_RESERVATION_FORM_INPUT.date,
      durationMinutes: EXPECTED_DURATION_MINUTES,
      peopleCount: VALID_RESERVATION_FORM_INPUT.peopleCount,
      time: VALID_RESERVATION_FORM_INPUT.time,
      equipmentCommitment: {
        kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
        categoryId: VALID_RESERVATION_FORM_INPUT.categoryId,
        quantity: VALID_RESERVATION_FORM_INPUT.quantity,
      },
    });
    expect(result.errors).toEqual({});
  });

  it("validates a concrete unit without requiring a category quantity", () => {
    const result = validateReservationFormInput({
      ...VALID_RESERVATION_FORM_INPUT,
      quantity: INVALID_QUANTITY,
      unitId: CONCRETE_UNIT_ID,
    });

    expect(result.value?.equipmentCommitment).toEqual({
      kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
      unitId: CONCRETE_UNIT_ID,
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

  it("rejects an empty custom duration resolved to zero", () => {
    const result = validateReservationFormInput({
      ...VALID_RESERVATION_FORM_INPUT,
      durationHours: ZERO_DURATION_HOURS,
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
