import {
  MOVEMENT_REPORT_WEEKDAYS,
  type MovementReportWeekday,
} from "../constants/MovementReport.constants";
import { MOVEMENT_REPORT_WEEKDAY_LABEL } from "../constants/MovementReportCopy.constants";
import type { MovementBarChartRow } from "../models/MovementBarChart.interface";
import type {
  MovementMonthValue,
  MovementWeekdayValue,
} from "../models/MovementReportData.interface";
import { formatMovementAmount } from "./formatMovementAmount";
import { formatMovementMonth } from "./formatMovementMonth";

export const buildMonthDepartureRows = (
  months: MovementMonthValue[]
): MovementBarChartRow[] =>
  months.map(({ month, value }) => ({
    key: month,
    label: formatMovementMonth(month),
    value,
    valueLabel: String(value),
  }));

export const buildMonthIncomeRows = (
  currency: string,
  months: MovementMonthValue[]
): MovementBarChartRow[] =>
  months.map(({ month, value }) => ({
    key: month,
    label: formatMovementMonth(month),
    value: Math.max(value, 0),
    valueLabel: formatMovementAmount(currency, value),
  }));

export const buildWeekdayDepartureRows = (
  weekdays: MovementWeekdayValue[]
): MovementBarChartRow[] =>
  MOVEMENT_REPORT_WEEKDAYS.map(
    (weekday: MovementReportWeekday) => {
      const value =
        weekdays.find((entry) => entry.weekday === weekday)
          ?.value ?? 0;

      return {
        key: String(weekday),
        label: MOVEMENT_REPORT_WEEKDAY_LABEL[weekday],
        value,
        valueLabel: String(value),
      };
    }
  );
