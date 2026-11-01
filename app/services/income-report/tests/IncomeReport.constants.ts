import { PostgrestError } from "@supabase/supabase-js";
import { CURRENCY_CODE } from "@/app/constants";
import type { ChargeMovement } from "@/app/services/income/models/ChargeMovement.interface";
import type { CostaRicaDayRange } from "@/app/utils/costa-rica-day/models/CostaRicaDayRange.interface";
import type { CurrencyIncomeSummary } from "@/app/utils/income-report/models/CurrencyIncomeSummary.interface";
import type { Money } from "@/app/utils/money/models/Money.interface";

export const DAY_RANGE: CostaRicaDayRange = {
  date: "2026-10-28",
  startsAt: "2026-10-28T06:00:00.000Z",
  endsAt: "2026-10-29T06:00:00.000Z",
};

export const USD_CHARGE: ChargeMovement = {
  amount: 100.5,
  currency: CURRENCY_CODE.USD,
  paymentMethod: "Tarjeta",
};

export const CRC_CHARGE: ChargeMovement = {
  amount: 25000,
  currency: CURRENCY_CODE.CRC,
  paymentMethod: "SINPE Móvil",
};

export const CRC_REFUND: Money = {
  amount: 5000,
  currency: CURRENCY_CODE.CRC,
};

export const EXPECTED_SUMMARIES: CurrencyIncomeSummary[] = [
  {
    currency: CURRENCY_CODE.USD,
    chargedCents: 10050,
    refundedCents: 0,
    netCents: 10050,
  },
  {
    currency: CURRENCY_CODE.CRC,
    chargedCents: 2500000,
    refundedCents: 500000,
    netCents: 2000000,
  },
];

export const POSTGREST_ERROR = new PostgrestError({
  message: "permission denied",
  details: "",
  hint: "",
  code: "42501",
});

export const QUERY_OPERATION = "read charges";
export const UNEXPECTED_MESSAGE = "unexpected";
export const NON_ERROR_VALUES: readonly unknown[] = [
  "failure",
  42,
  null,
  undefined,
  { message: UNEXPECTED_MESSAGE },
];
