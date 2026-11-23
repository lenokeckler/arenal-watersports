import { CURRENCY_CODE } from "@/app/constants";
import type { ReservationChargeRecordRows } from "../models/ReservationChargeRecordRows.type";
import type { ReservationChargeRecorded } from "../models/ReservationChargeRecorded.interface";
import { CHARGE_RECORD_ROW } from "./ReservationChargeAction.constants";

export const CRC_CHARGE_ROW = {
  ...CHARGE_RECORD_ROW,
  charge_id: "e2c20000-0000-4000-8000-000000000602",
  charged_amount: 12500,
  charged_currency: CURRENCY_CODE.CRC,
};

export const CRC_FIRST_ROWS: ReservationChargeRecordRows = [
  CRC_CHARGE_ROW,
  CHARGE_RECORD_ROW,
];

export const MIXED_RECORDED: ReservationChargeRecorded = {
  parts: [
    {
      amount: CRC_CHARGE_ROW.charged_amount,
      chargeId: CRC_CHARGE_ROW.charge_id,
      currency: CURRENCY_CODE.CRC,
    },
    {
      amount: CHARGE_RECORD_ROW.charged_amount,
      chargeId: CHARGE_RECORD_ROW.charge_id,
      currency: CURRENCY_CODE.USD,
    },
  ],
  paymentMethod: CHARGE_RECORD_ROW.charged_payment_method,
  recordedByName: CHARGE_RECORD_ROW.recorded_by_name,
};
