import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import type { CustomComboRpcItem } from "../models/CustomComboRpcItem.interface";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";

export const mapCustomComboRpcItems = (
  selections: CustomComboEquipmentSelection[]
): CustomComboRpcItem[] =>
  selections.map((selection) => {
    if (
      selection.kind ===
      RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT
    ) {
      return { unit_id: selection.unitId };
    }

    return {
      category_id: selection.categoryId,
      quantity: selection.quantity,
    };
  });
