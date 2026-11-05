import type { Dispatch } from "react";
import { CUSTOM_COMBO_DRAFT_ACTION } from "../constants/CustomComboDraftAction.constants";
import type { CustomComboDraftAction } from "../models/CustomComboDraftAction.type";
import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import type { CustomComboReservationDraft } from "../models/CustomComboReservationDraft.interface";
import type { ReservationFormField } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { reduceCustomComboDraft } from "../utils/reduceCustomComboDraft";

const createItemChangeHandler =
  (
    draft: CustomComboReservationDraft,
    dispatch: Dispatch<CustomComboDraftAction>,
    clearFieldError: (field: ReservationFormField) => void
  ) =>
  (selection: CustomComboEquipmentSelection): void => {
    const action: CustomComboDraftAction = {
      type: CUSTOM_COMBO_DRAFT_ACTION.ITEM_CHANGE,
      selection,
    };
    const nextDraft = reduceCustomComboDraft(draft, action);
    dispatch(action);
    if (nextDraft !== draft) {
      clearFieldError(RESERVATION_FORM_FIELD.ITEMS);
    }
  };

export const useCustomComboDraftActions = (
  draft: CustomComboReservationDraft,
  dispatch: Dispatch<CustomComboDraftAction>,
  clearFieldError: (field: ReservationFormField) => void
) => {
  const handleItemChange = createItemChangeHandler(
    draft,
    dispatch,
    clearFieldError
  );
  const handleItemRemoval = (categoryId: string): void => {
    dispatch({
      type: CUSTOM_COMBO_DRAFT_ACTION.ITEM_REMOVAL,
      categoryId,
    });
    clearFieldError(RESERVATION_FORM_FIELD.ITEMS);
  };

  return {
    handleAgreedAmountCrcChange: (
      value: CustomComboReservationDraft["agreedAmountCrc"]
    ): void =>
      dispatch({
        type: CUSTOM_COMBO_DRAFT_ACTION.AGREED_AMOUNT_CRC_CHANGE,
        value,
      }),
    handleAgreedAmountUsdChange: (
      value: CustomComboReservationDraft["agreedAmountUsd"]
    ): void =>
      dispatch({
        type: CUSTOM_COMBO_DRAFT_ACTION.AGREED_AMOUNT_USD_CHANGE,
        value,
      }),
    handleItemChange,
    handleItemRemoval,
  };
};
