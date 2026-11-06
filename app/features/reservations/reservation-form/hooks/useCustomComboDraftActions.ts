import type { Dispatch } from "react";
import { INDEX, STRING } from "@/app/constants";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import { CUSTOM_COMBO_DRAFT_ACTION } from "../constants/CustomComboDraftAction.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import type { CustomComboDraftAction } from "../models/CustomComboDraftAction.type";
import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import type { CustomComboReservationDraft } from "../models/CustomComboReservationDraft.interface";
import type { ReservationFormErrorField } from "../models/ReservationFormField.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { reduceCustomComboDraft } from "../utils/reduceCustomComboDraft";

const createItemChangeHandler =
  (
    draft: CustomComboReservationDraft,
    dispatch: Dispatch<CustomComboDraftAction>,
    clearFieldError: (
      field: ReservationFormErrorField
    ) => void
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
  clearFieldError: (
    field: ReservationFormErrorField
  ) => void
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
    ): void => {
      dispatch({
        type: CUSTOM_COMBO_DRAFT_ACTION.AGREED_AMOUNT_CRC_CHANGE,
        value,
      });
      clearFieldError(
        CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_CRC
      );
    },
    handleAgreedAmountUsdChange: (
      value: CustomComboReservationDraft["agreedAmountUsd"]
    ): void => {
      dispatch({
        type: CUSTOM_COMBO_DRAFT_ACTION.AGREED_AMOUNT_USD_CHANGE,
        value,
      });
      clearFieldError(
        CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD
      );
    },
    handleItemChange,
    handleItemRemoval,
    handleItemQuantityChange: (
      categoryId: string,
      quantity: number
    ): void => {
      if (quantity <= INDEX.ZERO) {
        handleItemRemoval(categoryId);
        return;
      }
      handleItemChange({
        kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
        categoryId,
        quantity,
      });
    },
    handleItemUnitChange: (
      categoryId: string,
      unitId: string
    ): void => {
      if (unitId === STRING.Empty) {
        handleItemRemoval(categoryId);
        return;
      }
      handleItemChange({
        kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
        categoryId,
        unitId,
      });
    },
  };
};
