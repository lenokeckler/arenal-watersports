import {
  CURRENCY_CODE,
  PAYMENT_CHOICE,
  RESERVATION_STATUS,
  STRING,
} from "@/app/constants";
import { RESERVATION_EXTRA_TIME_OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import type { ReservationExtraTimeGroupRow } from "../models/ReservationExtraTimeGroupRow.type";
import type { ReservationExtraTimeInput } from "../models/ReservationExtraTimeInput.interface";
import type { ReservationExtraTimeRecordRow } from "../models/ReservationExtraTimeRecordRow.type";
import type { ReservationExtraTimeReservationRow } from "../models/ReservationExtraTimeReservationRow.type";

export const EXTRA_TIME_RESERVATION_ID =
  "4d3c2b1a-0000-4000-8000-000000000301";
export const EXTRA_TIME_CHARGE_ID =
  "4d3c2b1a-0000-4000-8000-000000000901";
export const EXTRA_TIME_RECORDED_BY = "Ana Reservas";
export const EXTRA_TIME_AMOUNT_TEXT = "25.50";
export const EXTRA_TIME_AMOUNT = 25.5;
export const EXTRA_TIME_OTHER_METHOD = "Transferencia";
export const EXTRA_TIME_OVERDUE_MINUTES = 35;
export const EXTRA_TIME_EXTENDED_MINUTES = 30;
export const EXTRA_TIME_TOTAL_MINUTES =
  EXTRA_TIME_OVERDUE_MINUTES + EXTRA_TIME_EXTENDED_MINUTES;
export const EXTRA_TIME_NONE = 0;

export const EXTRA_TIME_RESERVATION_ROW: ReservationExtraTimeReservationRow =
  {
    code: "R-000301",
    customer_name: "Familia Mora",
    id: EXTRA_TIME_RESERVATION_ID,
    status: RESERVATION_STATUS.CLOSED,
  };

export const EXTRA_TIME_OVERDUE_ROW: ReservationExtraTimeGroupRow =
  {
    arrived_at: "2035-07-01T16:35:00+00:00",
    category_id: "4d3c2b1a-0000-4000-8000-000000000101",
    category_name: "Jet ski",
    dispatched_at: "2035-07-01T15:00:00+00:00",
    extended_minutes: EXTRA_TIME_NONE,
    extra_minutes: EXTRA_TIME_OVERDUE_MINUTES,
    planned_returns_at: "2035-07-01T16:00:00+00:00",
  };

export const EXTRA_TIME_EXTENDED_ROW: ReservationExtraTimeGroupRow =
  {
    arrived_at: "2035-07-01T16:30:00+00:00",
    category_id: "4d3c2b1a-0000-4000-8000-000000000102",
    category_name: "Kayak",
    dispatched_at: "2035-07-01T15:00:00+00:00",
    extended_minutes: EXTRA_TIME_EXTENDED_MINUTES,
    extra_minutes: EXTRA_TIME_EXTENDED_MINUTES,
    planned_returns_at: "2035-07-01T16:00:00+00:00",
  };

export const EXTRA_TIME_CHARGED_INPUT: ReservationExtraTimeInput =
  {
    amountText: EXTRA_TIME_AMOUNT_TEXT,
    currency: CURRENCY_CODE.USD,
    otherPaymentMethod: STRING.Empty,
    outcome: RESERVATION_EXTRA_TIME_OUTCOME.CHARGED,
    paymentChoice: PAYMENT_CHOICE.CASH,
    reservationId: EXTRA_TIME_RESERVATION_ID,
  };

export const EXTRA_TIME_COURTESY_INPUT: ReservationExtraTimeInput =
  {
    ...EXTRA_TIME_CHARGED_INPUT,
    amountText: STRING.Empty,
    outcome: RESERVATION_EXTRA_TIME_OUTCOME.COURTESY,
    paymentChoice: null,
  };

export const EXTRA_TIME_CHARGED_RECORD_ROW: ReservationExtraTimeRecordRow =
  {
    charge_id: EXTRA_TIME_CHARGE_ID,
    charged_amount: EXTRA_TIME_AMOUNT,
    charged_currency: CURRENCY_CODE.USD,
    charged_payment_method: "Efectivo",
    extra_minutes: EXTRA_TIME_TOTAL_MINUTES,
    outcome: RESERVATION_EXTRA_TIME_OUTCOME.CHARGED,
    recorded_by_name: EXTRA_TIME_RECORDED_BY,
  };
