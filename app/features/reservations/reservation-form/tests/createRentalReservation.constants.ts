import { SUPABASE } from "@/app/constants";
import type { ValidatedReservationFormInput } from "../models/ValidatedReservationFormInput.interface";

export const VALIDATED_RESERVATION_INPUT: ValidatedReservationFormInput =
  {
    categoryId: "e2400000-0000-4000-8000-000000000101",
    customerName: "RES04 Fixture Reservation",
    date: "2028-02-29",
    durationMinutes: 90,
    peopleCount: 3,
    quantity: 2,
    time: "09:30",
  };

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
