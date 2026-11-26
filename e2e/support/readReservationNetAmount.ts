import type { SupabaseClient } from "@supabase/supabase-js";
import {
  CHARGE_QUERY,
  REFUND_QUERY,
  type CurrencyCode,
} from "@/app/constants";
import { toCurrencyIncomeDisplay } from "@/app/features/administration/income/utils/toCurrencyIncomeDisplay";
import { summarizeIncomeByCurrency } from "@/app/utils/income-report/summarizeIncomeByCurrency";
import type { Money } from "@/app/utils/money/models/Money.interface";
import { E2E_INCOME_MONEY_SELECT } from "../constants/E2eIncome.constants";
import { E2E_RESERVATION_REFUND as values } from "../constants/E2eReservationRefund.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

const readReservationMoney = async (
  supabase: SupabaseClient,
  table: string,
  reservationId: string
): Promise<Money[]> => {
  const { data, error } = await supabase
    .from(table)
    .select(E2E_INCOME_MONEY_SELECT)
    .eq(values.RESERVATION_ID_COLUMN, reservationId);

  if (error) {
    return failE2eOperation(
      values.READ_NET_OPERATION,
      error.message
    );
  }

  return data.map((row) => ({
    amount: Number(row.amount),
    currency: row.currency,
  }));
};

export const readReservationNetAmount = async (
  reservationId: string,
  currency: CurrencyCode
): Promise<number> => {
  const supabase = createServiceRoleClient();
  const display = summarizeIncomeByCurrency({
    charges: await readReservationMoney(
      supabase,
      CHARGE_QUERY.TABLE,
      reservationId
    ),
    refunds: await readReservationMoney(
      supabase,
      REFUND_QUERY.TABLE,
      reservationId
    ),
  })
    .map(toCurrencyIncomeDisplay)
    .find((entry) => entry.currency === currency);
  if (!display) {
    return values.ZERO_NET;
  }

  return display.isNetNegative
    ? -display.net.amount
    : display.net.amount;
};
