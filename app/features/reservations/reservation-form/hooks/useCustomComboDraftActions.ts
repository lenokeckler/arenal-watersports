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
import { resolveCustomComboAgreedAmount } from "../utils/resolveCustomComboAgreedAmount";

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

const createItemRemovalHandler =
  (
    dispatch: Dispatch<CustomComboDraftAction>,
    clearFieldError: (
      field: ReservationFormErrorField
    ) => void
  ) =>
  (categoryId: string): void => {
    dispatch({
      type: CUSTOM_COMBO_DRAFT_ACTION.ITEM_REMOVAL,
      categoryId,
    });
    clearFieldError(RESERVATION_FORM_FIELD.ITEMS);
  };

const createItemQuantityChangeHandler =
  (
    handleItemChange: (
      selection: CustomComboEquipmentSelection
    ) => void,
    handleItemRemoval: (categoryId: string) => void
  ) =>
  (categoryId: string, quantity: number): void => {
    if (quantity <= INDEX.ZERO) {
      handleItemRemoval(categoryId);
      return;
    }
    handleItemChange({
      kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
      categoryId,
      quantity,
    });
  };

const createItemUnitChangeHandler =
  (
    handleItemChange: (
      selection: CustomComboEquipmentSelection
    ) => void,
    handleItemRemoval: (categoryId: string) => void
  ) =>
  (categoryId: string, unitId: string): void => {
    if (unitId === STRING.Empty) {
      handleItemRemoval(categoryId);
      return;
    }
    handleItemChange({
      kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
      categoryId,
      unitId,
    });
  };

const createItemActions = (
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
  const handleItemRemoval = createItemRemovalHandler(
    dispatch,
    clearFieldError
  );
  return {
    handleItemChange,
    handleItemRemoval,
    handleItemQuantityChange:
      createItemQuantityChangeHandler(
        handleItemChange,
        handleItemRemoval
      ),
    handleItemUnitChange: createItemUnitChangeHandler(
      handleItemChange,
      handleItemRemoval
    ),
  };
};

const createAgreedAmountActions = (
  dispatch: Dispatch<CustomComboDraftAction>,
  clearFieldError: (
    field: ReservationFormErrorField
  ) => void
) => ({
  handleAgreedAmountCrcChange: (
    value: CustomComboReservationDraft["agreedAmountCrc"]
  ): void => {
    dispatch({
      type: CUSTOM_COMBO_DRAFT_ACTION.AGREED_AMOUNT_CRC_CHANGE,
      value: resolveCustomComboAgreedAmount(value),
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
      value: resolveCustomComboAgreedAmount(value),
    });
    clearFieldError(
      CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD
    );
  },
});

const createExtraActions = (
  dispatch: Dispatch<CustomComboDraftAction>
) => ({
  handleExtraToggle: (
    unitId: string,
    extraId: string
  ): void => {
    dispatch({
      type: CUSTOM_COMBO_DRAFT_ACTION.EXTRA_TOGGLE,
      extraId,
      unitId,
    });
  },
});

export const useCustomComboDraftActions = (
  draft: CustomComboReservationDraft,
  dispatch: Dispatch<CustomComboDraftAction>,
  clearFieldError: (
    field: ReservationFormErrorField
  ) => void
) => {
  const agreedAmountActions = createAgreedAmountActions(
    dispatch,
    clearFieldError
  );
  const itemActions = createItemActions(
    draft,
    dispatch,
    clearFieldError
  );
  const extraActions = createExtraActions(dispatch);
  return {
    ...agreedAmountActions,
    ...extraActions,
    ...itemActions,
  };
};
