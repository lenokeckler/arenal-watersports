import { CUSTOM_COMBO_DRAFT_ACTION } from "../constants/CustomComboDraftAction.constants";
import type { CustomComboDraftAction } from "../models/CustomComboDraftAction.type";
import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import type { CustomComboReservationDraft } from "../models/CustomComboReservationDraft.interface";
import { CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS } from "../constants/CustomComboReservationDraft.constants";
import { hasValidCustomComboEquipmentSelections } from "./hasValidCustomComboEquipmentSelections";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";

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

const resolveExtrasAfterItemChange = (
  draft: CustomComboReservationDraft,
  selection: CustomComboEquipmentSelection
): Pick<
  CustomComboReservationDraft,
  "extraIds" | "extraUnitId"
> => {
  const previousSelection = draft.items.find(
    ({ categoryId }) => categoryId === selection.categoryId
  );
  const hasUnitChanged =
    previousSelection?.kind ===
      RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT &&
    previousSelection.unitId === draft.extraUnitId &&
    (selection.kind !==
      RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT ||
      previousSelection.unitId !== selection.unitId);

  return hasUnitChanged
    ? { extraIds: [], extraUnitId: null }
    : {
        extraIds: draft.extraIds,
        extraUnitId: draft.extraUnitId,
      };
};

const removeItem = (
  draft: CustomComboReservationDraft,
  categoryId: string
): CustomComboReservationDraft => {
  const removedSelection = draft.items.find(
    (item) => item.categoryId === categoryId
  );
  const removesExtraUnit =
    removedSelection?.kind ===
      RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT &&
    removedSelection.unitId === draft.extraUnitId;

  return {
    ...draft,
    extraIds: removesExtraUnit ? [] : draft.extraIds,
    extraUnitId: removesExtraUnit
      ? null
      : draft.extraUnitId,
    items: draft.items.filter(
      (item) => item.categoryId !== categoryId
    ),
  };
};

const toggleExtra = (
  draft: CustomComboReservationDraft,
  unitId: string,
  extraId: string
): CustomComboReservationDraft => {
  const currentExtraIds =
    draft.extraUnitId === unitId ? draft.extraIds : [];
  const extraIds = currentExtraIds.includes(extraId)
    ? currentExtraIds.filter(
        (selectedExtraId) => selectedExtraId !== extraId
      )
    : [...currentExtraIds, extraId];

  return {
    ...draft,
    extraIds,
    extraUnitId: extraIds.length > 0 ? unitId : null,
  };
};

export const reduceCustomComboDraft = (
  draft: CustomComboReservationDraft,
  action: CustomComboDraftAction
): CustomComboReservationDraft => {
  switch (action.type) {
    case CUSTOM_COMBO_DRAFT_ACTION.RESET:
      return CUSTOM_COMBO_RESERVATION_DRAFT_DEFAULTS;
    case CUSTOM_COMBO_DRAFT_ACTION.AGREED_AMOUNT_CRC_CHANGE:
      return { ...draft, agreedAmountCrc: action.value };
    case CUSTOM_COMBO_DRAFT_ACTION.AGREED_AMOUNT_USD_CHANGE:
      return { ...draft, agreedAmountUsd: action.value };
    case CUSTOM_COMBO_DRAFT_ACTION.EXTRA_TOGGLE:
      return toggleExtra(
        draft,
        action.unitId,
        action.extraId
      );
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
      const extras = resolveExtrasAfterItemChange(
        draft,
        action.selection
      );
      return hasValidCustomComboEquipmentSelections(items)
        ? { ...draft, ...extras, items }
        : draft;
    }
    case CUSTOM_COMBO_DRAFT_ACTION.ITEM_REMOVAL:
      return removeItem(draft, action.categoryId);
  }
  return draft;
};
