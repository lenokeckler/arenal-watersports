import { CURRENCY_CODE } from "@/app/constants";
import type { ReservationChargeCommand } from "../models/ReservationChargeCommand.interface";
import type { ReservationChargeRecordRow } from "../models/ReservationChargeRecordRow.interface";
import type { ReservationChargeRecorded } from "../models/ReservationChargeRecorded.interface";
import { CHARGE_RESERVATION_ID } from "./ReservationCharge.constants";

export const CHARGE_POSTGRES_PREFIX = "P0001: ";

export const CHARGE_UNEXPECTED_ERROR = new Error(
  "Unexpected charge failure"
);
export const CHARGE_ACCESS_REDIRECT = new Error(
  "NEXT_REDIRECT"
);

export const CHARGE_RECORD_ROW: ReservationChargeRecordRow =
  {
    charge_id: "e2c20000-0000-4000-8000-000000000601",
    charged_amount: 45.5,
    charged_currency: CURRENCY_CODE.USD,
    charged_payment_method: "Efectivo",
    recorded_by_name: "Ana Mora",
  };

export const CHARGE_RECORDED: ReservationChargeRecorded = {
  amount: 45.5,
  chargeId: "e2c20000-0000-4000-8000-000000000601",
  currency: CURRENCY_CODE.USD,
  paymentMethod: "Efectivo",
  recordedByName: "Ana Mora",
};

export const VALID_CHARGE_COMMAND: ReservationChargeCommand =
  {
    amount: 45.5,
    currency: CURRENCY_CODE.USD,
    paymentMethod: "Efectivo",
    reservationId: CHARGE_RESERVATION_ID,
  };

export const CHARGE_AMOUNT_TEXT_CASES = [
  { amountText: "45.50", expected: 45.5 },
  { amountText: "45,50", expected: 45.5 },
  { amountText: "  25000 ", expected: 25000 },
] as const;
