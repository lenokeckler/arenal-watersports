import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";

export type ReservationEquipmentCommitment =
  | {
      kind: typeof RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY;
      categoryId: string;
      quantity: number;
    }
  | {
      kind: typeof RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT;
      unitId: string;
    };
