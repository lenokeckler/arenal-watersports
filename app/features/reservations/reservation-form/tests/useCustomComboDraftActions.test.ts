import { vi, describe, expect, it } from "vitest";
import { CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS } from "../constants/CustomComboReservationDraft.constants";
import { CUSTOM_COMBO_DRAFT_ACTION } from "../constants/CustomComboDraftAction.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { useCustomComboDraftActions } from "../hooks/useCustomComboDraftActions";
import { CUSTOM_COMBO_FORM_TEST } from "./useCustomComboForm.constants";

describe("useCustomComboDraftActions", () => {
  it("clears the matching amount field error after either currency changes", () => {
    const clearFieldError = vi.fn();
    const actions = useCustomComboDraftActions(
      CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS,
      vi.fn(),
      clearFieldError
    );

    actions.handleAgreedAmountCrcChange(10);
    actions.handleAgreedAmountUsdChange(20);

    expect(clearFieldError).toHaveBeenNthCalledWith(
      1,
      CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_CRC
    );
    expect(clearFieldError).toHaveBeenNthCalledWith(
      2,
      CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD
    );
  });

  it("keeps the items error when an invalid selection is rejected", () => {
    const clearFieldError = vi.fn();
    const actions = useCustomComboDraftActions(
      CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS,
      vi.fn(),
      clearFieldError
    );

    actions.handleItemChange({
      kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
      categoryId:
        CUSTOM_COMBO_FORM_TEST.REGULAR_CATEGORY_ID,
      quantity: CUSTOM_COMBO_FORM_TEST.INVALID_QUANTITY,
    });

    expect(clearFieldError).not.toHaveBeenCalledWith(
      RESERVATION_FORM_FIELD.ITEMS
    );
  });

  it("stores a concrete unit as a combo item selection", () => {
    const dispatch = vi.fn();
    const actions = useCustomComboDraftActions(
      CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS,
      dispatch,
      vi.fn()
    );

    actions.handleItemUnitChange(
      CUSTOM_COMBO_FORM_TEST.GUIDE_CATEGORY_ID,
      CUSTOM_COMBO_FORM_TEST.GUIDE_UNIT_ID
    );

    expect(dispatch).toHaveBeenCalledWith({
      selection:
        CUSTOM_COMBO_FORM_TEST.GUIDE_UNIT_SELECTION,
      type: CUSTOM_COMBO_DRAFT_ACTION.ITEM_CHANGE,
    });
  });
});
