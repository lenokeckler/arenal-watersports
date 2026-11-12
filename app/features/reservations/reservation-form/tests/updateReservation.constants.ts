import { SUPABASE } from "@/app/constants";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import type { ValidatedReservationEditInput } from "../models/ValidatedReservationEditInput.interface";

export const UPDATED_RESERVATION_ID =
  "e3180000-0000-4000-8000-000000000301";

export const VALIDATED_RESERVATION_EDIT_INPUT = {
  durationMinutes: 90,
  equipmentCommitment: {
    kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
    categoryId: "e3180000-0000-4000-8000-000000000101",
    quantity: 2,
  },
  expectedUpdatedAt: "2035-04-12T15:00:00.123456+00:00",
  peopleCount: 3,
  reservationId: UPDATED_RESERVATION_ID,
  time: "09:30",
} satisfies ValidatedReservationEditInput;

export const VALIDATED_UNIT_RESERVATION_EDIT_INPUT = {
  ...VALIDATED_RESERVATION_EDIT_INPUT,
  equipmentCommitment: {
    kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
    unitId: "e3180000-0000-4000-8000-000000000201",
  },
} satisfies ValidatedReservationEditInput;

export const UPDATE_RESERVATION_RPC_URL = `${SUPABASE.URL}/rest/v1/rpc/update_reservation`;
export const SUCCESS_STATUS = 200;
export const BAD_REQUEST_STATUS = 400;
export const STALE_RPC_ERROR_BODY = {
  code: "P0001",
  details: null,
  hint: null,
  message: RESERVATION_SERVICE_OPERATION.RESERVATION_STALE,
};
