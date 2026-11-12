import { describe, expect, it } from "vitest";
import { createCustomComboReservationInput } from "../utils/createCustomComboReservationInput";
import { RESERVATION_SUBMIT_TEST } from "./createReservationFormSubmitHandler.constants";

describe("createCustomComboReservationInput", () => {
  it("maps combo values and selected guides into the action input", () => {
    const options = RESERVATION_SUBMIT_TEST.COMBO_OPTIONS;

    expect(
      createCustomComboReservationInput({
        draft: options.customCombo.draft,
        durationHours: options.resolvedDurationHours,
        hasGuideOnlyItem: true,
        values: options.values,
      })
    ).toEqual(
      RESERVATION_SUBMIT_TEST.EXPECTED_CUSTOM_COMBO_INPUT
    );
    expect(
      createCustomComboReservationInput({
        draft: options.customCombo.draft,
        durationHours: options.resolvedDurationHours,
        hasGuideOnlyItem: false,
        values: options.values,
      })
    ).toEqual({
      ...RESERVATION_SUBMIT_TEST.EXPECTED_CUSTOM_COMBO_INPUT,
      guideIds: [],
    });
  });
});
