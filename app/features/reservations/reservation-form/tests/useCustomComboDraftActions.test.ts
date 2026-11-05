import { vi, describe, expect, it } from "vitest";
import { CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS } from "../constants/CustomComboReservationDraft.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { useCustomComboDraftActions } from "../hooks/useCustomComboDraftActions";
import { CUSTOM_COMBO_FORM_TEST } from "./useCustomComboForm.constants";

describe("useCustomComboDraftActions", () => {
  it("keeps the items error when an invalid selection is rejected", () => {
    const clearFieldError = vi.fn();
    const actions = useCustomComboDraftActions(
      CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS,
      vi.fn(),
      clearFieldError
    );

    actions.handleItemChange({
      categoryId:
        CUSTOM_COMBO_FORM_TEST.REGULAR_CATEGORY_ID,
      quantity: CUSTOM_COMBO_FORM_TEST.INVALID_QUANTITY,
    });

    expect(clearFieldError).not.toHaveBeenCalledWith(
      RESERVATION_FORM_FIELD.ITEMS
    );
  });
});
