import { createServerSupabaseClient } from "@/app/services/supabase";
import { isAdministratorSignedIn } from "@/app/services/worker-registration";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  MOVEMENT_REPORT_ERROR,
  MOVEMENT_REPORT_LIMITS,
} from "../constants/MovementReport.constants";
import { buildMovementCutoffMonth } from "../utils/buildMovementCutoffMonth";
import type {
  MovementIncomeSeries,
  MovementReportData,
} from "../models/MovementReportData.interface";

export class MovementReportAccessError extends Error {
  constructor() {
    super(MOVEMENT_REPORT_ERROR.NOT_ADMINISTRATOR);
    this.name = "MovementReportAccessError";
  }
}

export const getMovementReport =
  async (): Promise<MovementReportData> => {
    if (!(await isAdministratorSignedIn())) {
      throw new MovementReportAccessError();
    }

    const supabase = await createServerSupabaseClient();
    const cutoffMonth = buildMovementCutoffMonth(
      new Date()
    );
    const [months, weekdays, income] = await Promise.all([
      supabase
        .from("monthly_departures")
        .select("month, departures_count")
        .gte("month", cutoffMonth)
        .order("month", { ascending: true })
        .limit(MOVEMENT_REPORT_LIMITS.MONTHS_MAX),
      supabase
        .from("weekday_departures")
        .select("weekday, departures_count"),
      supabase
        .from("monthly_revenue_report")
        .select("month, currency, net_amount")
        .gte("month", cutoffMonth)
        .order("month", { ascending: true })
        .limit(MOVEMENT_REPORT_LIMITS.MONTHS_MAX * 2),
    ]);

    throwIfSupabaseError(
      months.error,
      MOVEMENT_REPORT_ERROR.LOAD_MONTHS
    );
    throwIfSupabaseError(
      weekdays.error,
      MOVEMENT_REPORT_ERROR.LOAD_WEEKDAYS
    );
    throwIfSupabaseError(
      income.error,
      MOVEMENT_REPORT_ERROR.LOAD_INCOME
    );

    const series = new Map<string, MovementIncomeSeries>();

    for (const row of income.data ?? []) {
      if (row.month === null || row.currency === null) {
        continue;
      }

      const current = series.get(row.currency) ?? {
        currency: row.currency,
        months: [],
      };
      current.months.push({
        month: row.month,
        value: Number(row.net_amount ?? 0),
      });
      series.set(row.currency, current);
    }

    return {
      departuresByMonth: (months.data ?? []).flatMap(
        (row) =>
          row.month === null
            ? []
            : [
                {
                  month: row.month,
                  value: row.departures_count ?? 0,
                },
              ]
      ),
      departuresByWeekday: (weekdays.data ?? []).flatMap(
        (row) =>
          row.weekday === null
            ? []
            : [
                {
                  value: row.departures_count ?? 0,
                  weekday: row.weekday,
                },
              ]
      ),
      incomeByCurrency: [...series.values()].sort(
        (first, second) =>
          first.currency.localeCompare(second.currency)
      ),
    };
  };
