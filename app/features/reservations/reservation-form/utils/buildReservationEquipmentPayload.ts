import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import type { ReservationEquipmentCommitment } from "../models/ReservationEquipmentCommitment.type";

export const buildReservationEquipmentPayload = (
  commitment: ReservationEquipmentCommitment
) =>
  commitment.kind ===
  RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY
    ? {
        category_id: commitment.categoryId,
        quantity: commitment.quantity,
      }
    : { unit_id: commitment.unitId };
