import { SUPABASE } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_QUERY } from "../constants/ReservationPostponementQuery.constants";
import { POSTPONEMENT_RESERVATION_ID } from "./ReservationPostponement.constants";
import { VALID_POSTPONEMENT_INPUT } from "./ReservationPostponementInput.constants";

const [VALID_READING] = VALID_POSTPONEMENT_INPUT.readings;

export const POSTPONE_RPC_URL = `${SUPABASE.URL}/rest/v1/rpc/${RESERVATION_POSTPONEMENT_QUERY.RPC}`;
export const POSTPONE_SUCCESS_STATUS = 200;
export const POSTPONE_BAD_REQUEST_STATUS = 400;
export const POSTPONE_RPC_RESULT =
  POSTPONEMENT_RESERVATION_ID;

export const POSTPONE_PAYLOAD = {
  cause: VALID_POSTPONEMENT_INPUT.cause,
  date: VALID_POSTPONEMENT_INPUT.date,
  expected_updated_at:
    VALID_POSTPONEMENT_INPUT.expectedUpdatedAt,
  readings: [
    {
      fuel_in: VALID_READING.fuelIn,
      item_id: VALID_READING.itemId,
      usage_in: VALID_READING.usageIn,
    },
  ],
  reason: VALID_POSTPONEMENT_INPUT.reason,
  reservation_id: VALID_POSTPONEMENT_INPUT.reservationId,
  time: VALID_POSTPONEMENT_INPUT.time,
};

export const POSTPONE_NULL_READING_PAYLOAD = {
  fuel_in: null,
  item_id: VALID_READING.itemId,
  usage_in: null,
};

export const POSTPONE_RPC_ERROR_MESSAGE =
  "Reservation changed since the form was loaded";

export const POSTPONE_RPC_ERROR_BODY = {
  code: "P0001",
  details: null,
  hint: null,
  message: POSTPONE_RPC_ERROR_MESSAGE,
};

export const POSTPONE_PADDED_REASON = "  Cliente enfermo  ";

export const POSTPONE_ZERO_READING_PAYLOAD = {
  fuel_in: 0,
  item_id: VALID_READING.itemId,
  usage_in: 0,
};
