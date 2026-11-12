import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import { isUniqueReservationExtraIds } from "./isUniqueReservationExtraIds";
import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import { RESERVATION_EXTRA } from "../constants/ReservationExtra.constants";
import { TYPE_OF } from "@/app/constants";

const isString = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING;

const isReservationExtraUnitId = (
  value: unknown
): value is string => {
  if (!isString(value)) {
    return false;
  }
  return RESERVATION_EXTRA.UUID_PATTERN.test(value);
};

export const isValidCustomComboExtraSelection = (
  extraIds: unknown,
  extraUnitId: unknown,
  items: CustomComboEquipmentSelection[]
): boolean => {
  if (!isUniqueReservationExtraIds(extraIds)) {
    return false;
  }
  if (extraIds.length === 0) {
    return (
      extraUnitId === null || extraUnitId === undefined
    );
  }
  if (!isReservationExtraUnitId(extraUnitId)) {
    return false;
  }
  return items.some(
    (selection) =>
      selection.kind ===
        RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT &&
      selection.unitId === extraUnitId
  );
};
