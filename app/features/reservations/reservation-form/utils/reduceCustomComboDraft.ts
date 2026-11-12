import { CUSTOM_COMBO_DRAFT_ACTION } from "../constants/CustomComboDraftAction.constants";
import type { CustomComboDraftAction } from "../models/CustomComboDraftAction.type";
import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import type { CustomComboReservationDraft } from "../models/CustomComboReservationDraft.interface";
import { hasValidCustomComboEquipmentSelections } from "./hasValidCustomComboEquipmentSelections";

const addOrReplaceItem = (
  items: CustomComboReservationDraft["items"],
  selection: CustomComboEquipmentSelection
) => {
  const hasCategory = items.some(
    ({ categoryId }) => categoryId === selection.categoryId
  );

  return hasCategory
    ? items.map((item) =>
        item.categoryId === selection.categoryId
          ? selection
          : item
      )
    : [...items, selection];
};

export const reduceCustomComboDraft = (
  draft: CustomComboReservationDraft,
  action: CustomComboDraftAction
): CustomComboReservationDraft => {
  switch (action.type) {
    case CUSTOM_COMBO_DRAFT_ACTION.AGREED_AMOUNT_CRC_CHANGE:
      return { ...draft, agreedAmountCrc: action.value };
    case CUSTOM_COMBO_DRAFT_ACTION.AGREED_AMOUNT_USD_CHANGE:
      return { ...draft, agreedAmountUsd: action.value };
    case CUSTOM_COMBO_DRAFT_ACTION.ITEM_CHANGE: {
      if (
        !hasValidCustomComboEquipmentSelections([
          action.selection,
        ])
      ) {
        return draft;
      }
      const items = addOrReplaceItem(
        draft.items,
        action.selection
      );
      return hasValidCustomComboEquipmentSelections(items)
        ? { ...draft, items }
        : draft;
    }
    case CUSTOM_COMBO_DRAFT_ACTION.ITEM_REMOVAL:
      return {
        ...draft,
        items: draft.items.filter(
          ({ categoryId }) =>
            categoryId !== action.categoryId
        ),
      };
  }
  return draft;
};
