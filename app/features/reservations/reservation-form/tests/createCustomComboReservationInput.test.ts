import { describe, expect, it } from "vitest";
import { createCustomComboReservationInput } from "../utils/createCustomComboReservationInput";
import { RESERVATION_SUBMIT_TEST } from "./createReservationFormSubmitHandler.constants";
import { CUSTOM_COMBO_UNIT_EXTRAS_TEST } from "./CustomComboUnitExtras.constants";

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

  it("includes extras and their concrete unit in combo submission", () => {
    const options = RESERVATION_SUBMIT_TEST.COMBO_OPTIONS;

    expect(
      createCustomComboReservationInput({
        draft: {
          ...options.customCombo.draft,
          extraIds: [
            CUSTOM_COMBO_UNIT_EXTRAS_TEST.EXTRA_ID,
          ],
          extraUnitId:
            CUSTOM_COMBO_UNIT_EXTRAS_TEST.UNIT_ID,
        },
        durationHours: options.resolvedDurationHours,
        hasGuideOnlyItem: true,
        values: options.values,
      })
    ).toMatchObject({
      extraIds: [CUSTOM_COMBO_UNIT_EXTRAS_TEST.EXTRA_ID],
      extraUnitId: CUSTOM_COMBO_UNIT_EXTRAS_TEST.UNIT_ID,
    });
  });
});
