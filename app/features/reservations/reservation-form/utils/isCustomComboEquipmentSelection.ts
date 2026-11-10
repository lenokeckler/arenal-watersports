import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";

export const isCustomComboEquipmentSelection = (
  input: unknown
): input is CustomComboEquipmentSelection => {
  if (typeof input !== "object" || input === null) {
    return false;
  }

  if (
    !("kind" in input) ||
    !("categoryId" in input) ||
    typeof input.categoryId !== "string"
  ) {
    return false;
  }

  if (
    input.kind ===
    RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY
  ) {
    return (
      "quantity" in input &&
      typeof input.quantity === "number" &&
      !("unitId" in input)
    );
  }

  return (
    input.kind ===
      RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT &&
    "unitId" in input &&
    typeof input.unitId === "string" &&
    !("quantity" in input)
  );
};
