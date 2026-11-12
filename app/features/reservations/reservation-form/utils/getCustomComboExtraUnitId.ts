import { STRING } from "@/app/constants";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import type { ReservationCategoryOption } from "../models/ReservationCategoryOption.interface";

export const getCustomComboExtraUnitId = (
  items: CustomComboEquipmentSelection[],
  categories: ReservationCategoryOption[]
): string => {
  const selectedUnit = items.find((item) => {
    if (
      item.kind !== RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT
    ) {
      return false;
    }
    const category = categories.find(
      ({ id }) => id === item.categoryId
    );
    return (
      category?.isGuideOnly === true &&
      category.isInterchangeable === false
    );
  });
  return selectedUnit?.kind ===
    RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT
    ? selectedUnit.unitId
    : STRING.Empty;
};
