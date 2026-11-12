import { expect, it } from "vitest";
import {
  buildMonthDepartureRows,
  buildMonthIncomeRows,
  buildWeekdayDepartureRows,
} from "../utils/buildMovementCharts";
import { formatMovementMonth } from "../utils/formatMovementMonth";
import {
  MOVEMENT_MONTH_TEXT,
  MOVEMENT_REPORT,
} from "./MovementReport.constants";

it("writes the month as short name and year, whatever the timezone of the server", () => {
  expect(formatMovementMonth("2026-01-01")).toBe(
    MOVEMENT_MONTH_TEXT.JANUARY
  );
  expect(formatMovementMonth("2026-02-01")).toBe(
    MOVEMENT_MONTH_TEXT.FEBRUARY
  );
});

it("builds a row per month with its departures", () => {
  expect(
    buildMonthDepartureRows(
      MOVEMENT_REPORT.departuresByMonth
    )
  ).toEqual([
    {
      key: "2026-01-01",
      label: MOVEMENT_MONTH_TEXT.JANUARY,
      value: 10,
      valueLabel: "10",
    },
    {
      key: "2026-02-01",
      label: MOVEMENT_MONTH_TEXT.FEBRUARY,
      value: 5,
      valueLabel: "5",
    },
  ]);
});

it("writes the income of each month in its currency", () => {
  const [january] = buildMonthIncomeRows(
    "USD",
    MOVEMENT_REPORT.incomeByCurrency[0].months
  );

  expect(january.value).toBe(1500);
  expect(january.valueLabel).toContain("1");
  expect(january.valueLabel).toContain("500");
});

it("does not draw a negative income as a negative bar", () => {
  const [row] = buildMonthIncomeRows("USD", [
    { month: "2026-03-01", value: -40 },
  ]);

  expect(row.value).toBe(0);
});

it("lists the seven weekdays from Monday and counts zero for a day without departures", () => {
  const rows = buildWeekdayDepartureRows(
    MOVEMENT_REPORT.departuresByWeekday
  );

  expect(rows.map((row) => row.label)).toEqual([
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ]);
  expect(rows.map((row) => row.value)).toEqual([
    0, 2, 0, 0, 0, 8, 0,
  ]);
});
