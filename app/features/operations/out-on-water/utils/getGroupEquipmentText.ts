import { OUT_ON_WATER_COPY } from "../constants/OutOnWaterCopy.constants";
import type { DispatchedGroupOut } from "../models/DispatchedGroupOut.interface";

export const getGroupEquipmentText = (
  group: DispatchedGroupOut
): string => {
  const equipment =
    group.unitCodes.length > 0
      ? group.unitCodes.join(
          OUT_ON_WATER_COPY.UNITS_SEPARATOR
        )
      : `${OUT_ON_WATER_COPY.QUANTITY_LABEL}${group.quantity}`;

  return `${group.categoryName}${OUT_ON_WATER_COPY.RESERVATION_SEPARATOR}${equipment}`;
};
