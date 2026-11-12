import { SUPABASE } from "@/app/constants";
import { RESERVATION_EQUIPMENT_COMMITMENT_TYPE } from "../constants/ReservationEquipmentCommitmentType.constants";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ValidatedReservationFormInput } from "../models/ValidatedReservationFormInput.interface";

export const VALIDATED_RESERVATION_INPUT = {
  customerName: "RES04 Fixture Reservation",
  date: "2028-02-29",
  durationMinutes: 90,
  extraIds: [],
  peopleCount: 3,
  reservationType: RESERVATION_TYPE.RENTAL,
  time: "09:30",
  equipmentCommitment: {
    kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.CATEGORY,
    categoryId: "e2400000-0000-4000-8000-000000000101",
    quantity: 2,
  },
} satisfies ValidatedReservationFormInput;

export const VALIDATED_UNIT_RESERVATION_INPUT = {
  ...VALIDATED_RESERVATION_INPUT,
  equipmentCommitment: {
    kind: RESERVATION_EQUIPMENT_COMMITMENT_TYPE.UNIT,
    unitId: "e2400000-0000-4000-8000-000000000102",
  },
} satisfies ValidatedReservationFormInput;

export const VALIDATED_RESERVATION_WITH_EXTRAS_INPUT = {
  ...VALIDATED_UNIT_RESERVATION_INPUT,
  extraIds: ["e2400000-0000-4000-8000-000000000401"],
} satisfies ValidatedReservationFormInput;

export const VALIDATED_TOUR_RESERVATION_INPUT = {
  ...VALIDATED_RESERVATION_INPUT,
  guideIds: ["e2400000-0000-4000-8000-000000000301"],
  reservationType: RESERVATION_TYPE.TOUR,
} satisfies ValidatedReservationFormInput;

export const CREATED_RESERVATION_ID =
  "e2400000-0000-4000-8000-000000000201";
export const CREATE_RESERVATION_RPC_URL = `${SUPABASE.URL}/rest/v1/rpc/create_rental_reservation`;
export const SUCCESS_STATUS = 200;
export const BAD_REQUEST_STATUS = 400;
export const RPC_ERROR_BODY = {
  code: "P0001",
  details: null,
  hint: null,
  message:
    "Equipment category is not available for reservation",
};
