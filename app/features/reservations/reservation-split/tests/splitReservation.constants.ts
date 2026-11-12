import { SUPABASE } from "@/app/constants";
import { RESERVATION_SPLIT_QUERY } from "../constants/ReservationSplitQuery.constants";
import {
  SPLIT_DEPARTURE_ID,
  VALID_SPLIT_INPUT,
} from "./ReservationSplit.constants";

export const SPLIT_RPC_URL = `${SUPABASE.URL}/rest/v1/rpc/${RESERVATION_SPLIT_QUERY.RPC}`;
export const SPLIT_SUCCESS_STATUS = 200;
export const SPLIT_BAD_REQUEST_STATUS = 400;
export const SPLIT_DEPARTURE_CODE = "R-000124";

export const SPLIT_RPC_ROWS = [
  {
    departure_code: SPLIT_DEPARTURE_CODE,
    departure_id: SPLIT_DEPARTURE_ID,
  },
];

export const SPLIT_PAYLOAD = {
  departures: [
    {
      items: [
        {
          item_id:
            VALID_SPLIT_INPUT.departures[0].items[0].itemId,
          quantity:
            VALID_SPLIT_INPUT.departures[0].items[0]
              .quantity,
        },
      ],
      people_count:
        VALID_SPLIT_INPUT.departures[0].peopleCount,
      time: VALID_SPLIT_INPUT.departures[0].time,
    },
  ],
  expected_updated_at: VALID_SPLIT_INPUT.expectedUpdatedAt,
  reservation_id: VALID_SPLIT_INPUT.reservationId,
};

export const SPLIT_RPC_ERROR_BODY = {
  code: "P0001",
  details: null,
  hint: null,
  message: "Reservation changed since the form was loaded",
};
