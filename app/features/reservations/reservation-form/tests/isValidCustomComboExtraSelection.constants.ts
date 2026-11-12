import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";

const UNIT_ID = "e5400000-0000-4000-8000-000000000101";
const OTHER_UNIT_ID =
  "e5400000-0000-4000-8000-000000000102";
const EXTRA_ID = "e5400000-0000-4000-8000-000000000201";
const ITEMS: CustomComboEquipmentSelection[] = [
  {
    categoryId: "e5400000-0000-4000-8000-000000000301",
    kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
    unitId: UNIT_ID,
  },
];

export const CUSTOM_COMBO_EXTRA_SELECTION_TEST = {
  EXTRA_ID,
  ITEMS,
  OTHER_UNIT_ID,
  UNIT_ID,
} as const;
