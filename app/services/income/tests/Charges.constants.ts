import { CURRENCY_CODE } from "@/app/constants";
import type { ChargeMovement } from "../models/ChargeMovement.interface";
import type { ChargeRange } from "../models/ChargeRange.type";
import type { ChargeRow } from "../models/ChargeRow.interface";

export const DAY_RANGE: ChargeRange = {
  startsAt: "2026-10-28T06:00:00.000Z",
  endsAt: "2026-10-29T06:00:00.000Z",
};

export const USD_CARD_ROW: ChargeRow = {
  amount: 85.5,
  currency: CURRENCY_CODE.USD,
  payment_method: "Tarjeta",
};

export const CRC_SINPE_ROW: ChargeRow = {
  amount: 25000,
  currency: CURRENCY_CODE.CRC,
  payment_method: "SINPE Móvil",
};

export const USD_CARD_MOVEMENT: ChargeMovement = {
  amount: 85.5,
  currency: CURRENCY_CODE.USD,
  paymentMethod: "Tarjeta",
};

export const CRC_SINPE_MOVEMENT: ChargeMovement = {
  amount: 25000,
  currency: CURRENCY_CODE.CRC,
  paymentMethod: "SINPE Móvil",
};

export const BOTH_ROWS = [USD_CARD_ROW, CRC_SINPE_ROW];

export const BOTH_ROWS_COUNT = 2;

export const MORE_ROWS_THAN_RETURNED = 3;

export const POSTGREST_ERROR = {
  name: "PostgrestError",
  message: "permission denied",
  details: "",
  hint: "",
  code: "42501",
};
