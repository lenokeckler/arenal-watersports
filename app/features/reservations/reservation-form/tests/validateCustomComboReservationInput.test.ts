import { describe, expect, it } from "vitest";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import { hasValidCustomComboEquipmentSelections } from "../utils/hasValidCustomComboEquipmentSelections";
import { validateCustomComboReservationInput } from "../utils/validateCustomComboReservationInput";
import {
  INVALID_CUSTOM_COMBO_DURATION_HOURS,
  EXPECTED_CUSTOM_COMBO_DURATION_MINUTES,
  INVALID_CUSTOM_COMBO_PEOPLE_COUNTS,
  INVALID_CUSTOM_COMBO_QUANTITY,
  NON_FINITE_AGREED_AMOUNTS,
  NEGATIVE_AGREED_AMOUNT,
  VALID_CUSTOM_COMBO_RESERVATION_INPUT,
} from "./validateCustomComboReservationInput.constants";

describe("validateCustomComboReservationInput", () => {
  it("trims customer data and converts duration to whole minutes", () => {
    const result = validateCustomComboReservationInput(
      VALID_CUSTOM_COMBO_RESERVATION_INPUT
    );

    expect(result.value?.customerName).toBe(
      "MarÃ­a LÃ³pez"
    );
    expect(result.value?.durationMinutes).toBe(
      EXPECTED_CUSTOM_COMBO_DURATION_MINUTES
    );
    expect(result.value?.items).toEqual(
      VALID_CUSTOM_COMBO_RESERVATION_INPUT.items
    );
    expect(result.errors).toEqual({});
  });

  it("rejects empty, duplicate, and non-positive equipment selections", () => {
    const duplicateSelections = [
      VALID_CUSTOM_COMBO_RESERVATION_INPUT.items[0],
      VALID_CUSTOM_COMBO_RESERVATION_INPUT.items[0],
    ];
    const invalidQuantitySelections = [
      {
        ...VALID_CUSTOM_COMBO_RESERVATION_INPUT.items[0],
        quantity: INVALID_CUSTOM_COMBO_QUANTITY,
      },
    ];

    expect(hasValidCustomComboEquipmentSelections([])).toBe(
      false
    );
    expect(
      hasValidCustomComboEquipmentSelections(
        duplicateSelections
      )
    ).toBe(false);
    expect(
      hasValidCustomComboEquipmentSelections(
        invalidQuantitySelections
      )
    ).toBe(false);
  });

  it("rejects sparse equipment selection arrays", () => {
    const sparseSelections = [
      ...VALID_CUSTOM_COMBO_RESERVATION_INPUT.items,
    ];
    delete sparseSelections[0];

    expect(
      hasValidCustomComboEquipmentSelections(
        sparseSelections
      )
    ).toBe(false);

    const result = validateCustomComboReservationInput({
      ...VALID_CUSTOM_COMBO_RESERVATION_INPUT,
      items: sparseSelections,
    });

    expect(result.value).toBeNull();
    expect(result.errors).toHaveProperty(
      CUSTOM_COMBO_RESERVATION_FIELD.ITEMS
    );
  });

  it("rejects negative agreed prices", () => {
    const result = validateCustomComboReservationInput({
      ...VALID_CUSTOM_COMBO_RESERVATION_INPUT,
      agreedAmountUsd: NEGATIVE_AGREED_AMOUNT,
    });

    expect(result.value).toBeNull();
    expect(result.errors).toHaveProperty(
      CUSTOM_COMBO_RESERVATION_FIELD.ITEMS
    );
  });

  it.each(NON_FINITE_AGREED_AMOUNTS)(
    "rejects a non-finite agreed amount: %s",
    (agreedAmount) => {
      const result = validateCustomComboReservationInput({
        ...VALID_CUSTOM_COMBO_RESERVATION_INPUT,
        agreedAmountUsd: agreedAmount,
      });

      expect(result.value).toBeNull();
      expect(result.errors).toHaveProperty(
        CUSTOM_COMBO_RESERVATION_FIELD.ITEMS
      );
    }
  );

  it.each(INVALID_CUSTOM_COMBO_PEOPLE_COUNTS)(
    "rejects an invalid people count: %s",
    (peopleCount) => {
      const result = validateCustomComboReservationInput({
        ...VALID_CUSTOM_COMBO_RESERVATION_INPUT,
        peopleCount,
      });

      expect(result.value).toBeNull();
      expect(result.errors).toHaveProperty(
        CUSTOM_COMBO_RESERVATION_FIELD.PEOPLE_COUNT
      );
    }
  );

  it("preserves a currency-specific agreed amount when the other is unavailable", () => {
    const result = validateCustomComboReservationInput({
      ...VALID_CUSTOM_COMBO_RESERVATION_INPUT,
      agreedAmountUsd: null,
    });

    expect(result.value?.agreedAmountUsd).toBeNull();
    expect(result.value?.agreedAmountCrc).toBe(
      VALID_CUSTOM_COMBO_RESERVATION_INPUT.agreedAmountCrc
    );
    expect(result.errors).toEqual({});
  });

  it("rejects durations that exceed the RPC minute range", () => {
    const result = validateCustomComboReservationInput({
      ...VALID_CUSTOM_COMBO_RESERVATION_INPUT,
      durationHours: INVALID_CUSTOM_COMBO_DURATION_HOURS,
    });

    expect(result.value).toBeNull();
    expect(result.errors).toHaveProperty(
      CUSTOM_COMBO_RESERVATION_FIELD.DURATION_HOURS
    );
  });
});
