import { describe, expect, it } from "vitest";
import { PREDEFINED_COMBO_RESERVATION_FIELD } from "../models/PredefinedComboReservationField.constants";
import { validatePredefinedComboReservationInput } from "../utils/validatePredefinedComboReservationInput";
import {
  EMPTY_CUSTOMER_NAME,
  INVALID_COMBO_ID,
  NEGATIVE_DURATION_HOURS,
  NEGATIVE_PEOPLE_COUNT,
  VALID_PREDEFINED_COMBO_RESERVATION_INPUT,
  ZERO_PEOPLE_COUNT,
} from "./validatePredefinedComboReservationInput.constants";

describe("validatePredefinedComboReservationInput", () => {
  it("converts valid reservation details without accepting prices or items", () => {
    const validation =
      validatePredefinedComboReservationInput(
        VALID_PREDEFINED_COMBO_RESERVATION_INPUT
      );

    expect(validation.errors).toEqual({});
    expect(validation.value).toEqual({
      comboId:
        VALID_PREDEFINED_COMBO_RESERVATION_INPUT.comboId,
      customerName: "Predefined Combo Customer",
      date: VALID_PREDEFINED_COMBO_RESERVATION_INPUT.date,
      durationMinutes: 90,
      guideIds:
        VALID_PREDEFINED_COMBO_RESERVATION_INPUT.guideIds,
      peopleCount:
        VALID_PREDEFINED_COMBO_RESERVATION_INPUT.peopleCount,
      time: VALID_PREDEFINED_COMBO_RESERVATION_INPUT.time,
    });
  });

  it("rejects malformed combo identifiers", () => {
    const validation =
      validatePredefinedComboReservationInput({
        ...VALID_PREDEFINED_COMBO_RESERVATION_INPUT,
        comboId: INVALID_COMBO_ID,
      });

    expect(validation.value).toBeNull();
    expect(validation.errors.comboId).toBeDefined();
  });

  it("rejects blank customer names and non-positive people counts", () => {
    const validation =
      validatePredefinedComboReservationInput({
        ...VALID_PREDEFINED_COMBO_RESERVATION_INPUT,
        customerName: EMPTY_CUSTOMER_NAME,
        peopleCount: ZERO_PEOPLE_COUNT,
      });

    expect(validation.value).toBeNull();
    expect(validation.errors.customerName).toBeDefined();
    expect(validation.errors.peopleCount).toBeDefined();
  });

  it("rejects negative people counts", () => {
    const validation =
      validatePredefinedComboReservationInput({
        ...VALID_PREDEFINED_COMBO_RESERVATION_INPUT,
        peopleCount: NEGATIVE_PEOPLE_COUNT,
      });

    expect(validation.value).toBeNull();
    expect(validation.errors).toHaveProperty(
      PREDEFINED_COMBO_RESERVATION_FIELD.PEOPLE_COUNT
    );
  });

  it("rejects negative durations", () => {
    const validation =
      validatePredefinedComboReservationInput({
        ...VALID_PREDEFINED_COMBO_RESERVATION_INPUT,
        durationHours: NEGATIVE_DURATION_HOURS,
      });

    expect(validation.value).toBeNull();
    expect(validation.errors).toHaveProperty(
      PREDEFINED_COMBO_RESERVATION_FIELD.DURATION_HOURS
    );
  });
});
