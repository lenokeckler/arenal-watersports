import { RESERVATION_POSTPONEMENT_CAUSE } from "../constants/ReservationPostponementCause.constants";
import type { ReservationPostponementInput } from "../models/ReservationPostponementInput.interface";
import {
  POSTPONEMENT_RESERVATION_ID,
  POSTPONEMENT_UPDATED_AT,
} from "./ReservationPostponement.constants";

export const POSTPONEMENT_ITEM_ID =
  "e2000000-0000-4000-8000-0000000000a1";

export const VALID_POSTPONEMENT_INPUT: ReservationPostponementInput =
  {
    cause: RESERVATION_POSTPONEMENT_CAUSE.HEAVY_RAIN,
    date: "2035-04-14",
    expectedUpdatedAt: POSTPONEMENT_UPDATED_AT,
    readings: [
      {
        fuelIn: 3,
        itemId: POSTPONEMENT_ITEM_ID,
        usageIn: 1250.5,
      },
    ],
    reason: "",
    reservationId: POSTPONEMENT_RESERVATION_ID,
    time: "09:30",
  };
