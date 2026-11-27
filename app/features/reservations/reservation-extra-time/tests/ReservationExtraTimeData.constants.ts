import { CURRENCY_CODE } from "@/app/constants";
import { RESERVATION_EXTRA_TIME_OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import type { ReservationExtraTimeRecorded } from "../models/ReservationExtraTimeRecorded.interface";
import {
  EXTRA_TIME_AMOUNT,
  EXTRA_TIME_CHARGE_ID,
  EXTRA_TIME_RECORDED_BY,
  EXTRA_TIME_TOTAL_MINUTES,
} from "./ReservationExtraTime.constants";

export const EXTRA_TIME_READ_FAILURE = {
  code: "42501",
  details: null,
  hint: null,
  message: "permission denied",
};

export const EXTRA_TIME_MALFORMED_ID = "R-000301";

export const EXTRA_TIME_CHARGED_RECORDED: ReservationExtraTimeRecorded =
  {
    charge: {
      amount: EXTRA_TIME_AMOUNT,
      chargeId: EXTRA_TIME_CHARGE_ID,
      currency: CURRENCY_CODE.USD,
      paymentMethod: "Efectivo",
    },
    extraMinutes: EXTRA_TIME_TOTAL_MINUTES,
    outcome: RESERVATION_EXTRA_TIME_OUTCOME.CHARGED,
    recordedByName: EXTRA_TIME_RECORDED_BY,
  };
