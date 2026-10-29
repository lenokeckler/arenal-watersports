import { RESERVATION_RPC, SUPABASE } from "@/app/constants";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import type { ValidatedPredefinedComboReservationInput } from "../models/ValidatedPredefinedComboReservationInput.interface";

export const VALIDATED_PREDEFINED_COMBO_RESERVATION_INPUT =
  {
    comboId: "e4800000-0000-4000-8000-000000000301",
    customerName: "Predefined Combo Customer",
    date: "2030-06-15",
    durationMinutes: 90,
    guideIds: ["e4800000-0000-4000-8000-000000000302"],
    peopleCount: 3,
    time: "09:30",
  } satisfies ValidatedPredefinedComboReservationInput;

export const CREATED_PREDEFINED_COMBO_RESERVATION_ID =
  "e4800000-0000-4000-8000-000000000303";
export const CREATE_PREDEFINED_COMBO_RESERVATION_RPC_URL = `${SUPABASE.URL}/rest/v1/rpc/${RESERVATION_RPC.CREATE_PREDEFINED_COMBO}`;
export const PREDEFINED_COMBO_RESERVATION_OPERATION =
  RESERVATION_SERVICE_OPERATION.CREATE_PREDEFINED_COMBO;
export const SUCCESS_STATUS = 200;
export const BAD_REQUEST_STATUS = 400;
export const PREDEFINED_COMBO_RPC_ERROR_BODY = {
  code: "P0001",
  details: null,
  hint: null,
  message: "Predefined combo is not active",
};
