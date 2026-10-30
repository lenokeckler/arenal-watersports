import type { SupabaseClient } from "@supabase/supabase-js";
import {
  CHARGE_QUERY,
  REFUND_QUERY,
} from "@/app/constants";
import type { CurrencyIncomeDisplay } from "@/app/features/administration/income/models/CurrencyIncomeDisplay.interface";
import { toCurrencyIncomeDisplay } from "@/app/features/administration/income/utils/toCurrencyIncomeDisplay";
import { getCostaRicaDayRange } from "@/app/utils/costa-rica-day/getCostaRicaDayRange";
import { summarizeIncomeByCurrency } from "@/app/utils/income-report/summarizeIncomeByCurrency";
import type { Money } from "@/app/utils/money/models/Money.interface";
import {
  E2E_INCOME_ERROR,
  E2E_INCOME_MONEY_SELECT,
} from "../constants/E2eIncome.constants";
import { failE2eOperation } from "./failE2eOperation";

const readTodayMoney = async (
  supabase: SupabaseClient,
  table: string,
  column: string
): Promise<Money[]> => {
  const { startsAt, endsAt } = getCostaRicaDayRange(
    new Date()
  );
  const { data, error } = await supabase
    .from(table)
    .select(E2E_INCOME_MONEY_SELECT)
    .gte(column, startsAt)
    .lt(column, endsAt);

  if (error) {
    return failE2eOperation(
      E2E_INCOME_ERROR.READ_MOVEMENTS,
      error.message
    );
  }

  return data.map((row) => ({
    amount: Number(row.amount),
    currency: row.currency,
  }));
};

export const readTodayIncomeDisplays = async (
  supabase: SupabaseClient
): Promise<CurrencyIncomeDisplay[]> =>
  summarizeIncomeByCurrency({
    charges: await readTodayMoney(
      supabase,
      CHARGE_QUERY.TABLE,
      CHARGE_QUERY.CREATED_AT_COLUMN
    ),
    refunds: await readTodayMoney(
      supabase,
      REFUND_QUERY.TABLE,
      REFUND_QUERY.CREATED_AT_COLUMN
    ),
  }).map(toCurrencyIncomeDisplay);
