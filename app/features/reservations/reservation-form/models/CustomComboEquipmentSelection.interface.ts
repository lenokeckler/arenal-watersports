import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import type { ReservationEquipmentCommitment } from "./ReservationEquipmentCommitment.type";

export type CustomComboEquipmentSelection =
  | Extract<
      ReservationEquipmentCommitment,
      {
        kind: typeof RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY;
      }
    >
  | (Extract<
      ReservationEquipmentCommitment,
      {
        kind: typeof RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT;
      }
    > & { categoryId: string });
