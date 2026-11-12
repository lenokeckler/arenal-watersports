import { describe, expect, it } from "vitest";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import { CUSTOM_COMBO_AGREED_AMOUNT_MAX } from "../constants/CustomComboAgreedAmount.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import { hasValidCustomComboEquipmentSelections } from "../utils/hasValidCustomComboEquipmentSelections";
import { validateCustomComboReservationInput } from "../utils/validateCustomComboReservationInput";
import {
  INVALID_CUSTOM_COMBO_DURATION_HOURS,
  CUSTOM_COMBO_AGREED_AMOUNT_INCREMENT,
  EXPECTED_CUSTOM_COMBO_DURATION_MINUTES,
  INVALID_CUSTOM_COMBO_PEOPLE_COUNTS,
  INVALID_CUSTOM_COMBO_QUANTITY,
  NON_FINITE_AGREED_AMOUNTS,
  NEGATIVE_AGREED_AMOUNT,
  MAX_CUSTOM_COMBO_AGREED_AMOUNT_CRC,
  MAX_CUSTOM_COMBO_AGREED_AMOUNT_USD,
  VALID_CUSTOM_COMBO_RESERVATION_INPUT,
} from "./validateCustomComboReservationInput.constants";

describe("validateCustomComboReservationInput", () => {
  it("trims customer data and converts duration to whole minutes", () => {
    const result = validateCustomComboReservationInput(
      VALID_CUSTOM_COMBO_RESERVATION_INPUT
    );

    expect(result.value?.customerName).toBe("María López");
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

  it("rejects repeated unit assignments and incomplete unit selections", () => {
    const unitSelection = {
      kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
      categoryId: "aaaaaaaa-0000-0000-0000-000000000003",
      unitId: "aaaaaaaa-0000-0000-0000-000000000301",
    } as const;
    const duplicateUnitSelections = [
      unitSelection,
      {
        ...unitSelection,
        categoryId: "aaaaaaaa-0000-0000-0000-000000000004",
      },
    ];
    const incompleteUnitSelection = [
      { ...unitSelection, unitId: " " },
    ];

    expect(
      hasValidCustomComboEquipmentSelections(
        duplicateUnitSelections
      )
    ).toBe(false);
    expect(
      hasValidCustomComboEquipmentSelections(
        incompleteUnitSelection
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

  it("accepts zero and the maximum amounts for both currencies", () => {
    const result = validateCustomComboReservationInput({
      ...VALID_CUSTOM_COMBO_RESERVATION_INPUT,
      agreedAmountCrc: MAX_CUSTOM_COMBO_AGREED_AMOUNT_CRC,
      agreedAmountUsd: MAX_CUSTOM_COMBO_AGREED_AMOUNT_USD,
    });

    expect(result.value?.agreedAmountCrc).toBe(
      CUSTOM_COMBO_AGREED_AMOUNT_MAX.CRC
    );
    expect(result.value?.agreedAmountUsd).toBe(
      CUSTOM_COMBO_AGREED_AMOUNT_MAX.USD
    );
    expect(result.errors).toEqual({});

    const zeroAmountsResult =
      validateCustomComboReservationInput({
        ...VALID_CUSTOM_COMBO_RESERVATION_INPUT,
        agreedAmountCrc: 0,
        agreedAmountUsd: 0,
      });

    expect(zeroAmountsResult.value).not.toBeNull();
    expect(zeroAmountsResult.errors).toEqual({});
  });

  it("reports a CRC field error above the database maximum", () => {
    const result = validateCustomComboReservationInput({
      ...VALID_CUSTOM_COMBO_RESERVATION_INPUT,
      agreedAmountCrc:
        MAX_CUSTOM_COMBO_AGREED_AMOUNT_CRC +
        CUSTOM_COMBO_AGREED_AMOUNT_INCREMENT,
    });

    expect(result.value).toBeNull();
    expect(result.errors).toHaveProperty(
      CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_CRC
    );
    expect(result.errors).not.toHaveProperty(
      CUSTOM_COMBO_RESERVATION_FIELD.ITEMS
    );
  });

  it("reports a USD field error above the database maximum", () => {
    const result = validateCustomComboReservationInput({
      ...VALID_CUSTOM_COMBO_RESERVATION_INPUT,
      agreedAmountUsd:
        MAX_CUSTOM_COMBO_AGREED_AMOUNT_USD +
        CUSTOM_COMBO_AGREED_AMOUNT_INCREMENT,
    });

    expect(result.value).toBeNull();
    expect(result.errors).toHaveProperty(
      CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD
    );
    expect(result.errors).not.toHaveProperty(
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
      CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD
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
        CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD
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
