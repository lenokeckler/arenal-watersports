import { RESERVATION_RPC, SUPABASE } from "@/app/constants";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import type { ValidatedCustomComboReservationInput } from "../models/ValidatedCustomComboReservationInput.interface";

export const VALIDATED_CUSTOM_COMBO_RESERVATION_INPUT = {
  agreedAmountCrc: 30000,
  agreedAmountUsd: 60,
  customerName: "Combo Customer",
  date: "2030-06-15",
  durationMinutes: 90,
  guideIds: [],
  items: [
    {
      categoryId: "e4800000-0000-4000-8000-000000000101",
      quantity: 2,
    },
    {
      categoryId: "e4800000-0000-4000-8000-000000000102",
      quantity: 1,
    },
  ],
  peopleCount: 3,
  time: "09:30",
} satisfies ValidatedCustomComboReservationInput;

export const CREATED_CUSTOM_COMBO_RESERVATION_ID =
  "e4800000-0000-4000-8000-000000000201";
export const CREATE_CUSTOM_COMBO_RESERVATION_RPC_URL = `${SUPABASE.URL}/rest/v1/rpc/${RESERVATION_RPC.CREATE_CUSTOM_COMBO}`;
export const SUCCESS_STATUS = 200;
export const BAD_REQUEST_STATUS = 400;
export const CUSTOM_COMBO_RPC_ERROR_BODY = {
  code: "P0001",
  details: null,
  hint: null,
  message:
    "Equipment category is not available for reservation",
};
export const CUSTOM_COMBO_RESERVATION_OPERATION =
  RESERVATION_SERVICE_OPERATION.CREATE_CUSTOM_COMBO;
