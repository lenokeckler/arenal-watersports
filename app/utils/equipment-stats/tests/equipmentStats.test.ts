import { describe, expect, it } from "vitest";
import {
  listRecentMonths,
  shiftMonthKey,
} from "@/app/utils/equipment-months/listRecentMonths";
import {
  formatMonthName,
  formatShortDay,
} from "@/app/utils/equipment-months/formatEquipmentDates";
import { toCostaRicaDate } from "@/app/utils/equipment-months/toCostaRicaDate";
import { resolveBarShare } from "@/app/utils/chart/resolveBarShare";
import { countDamageByCause } from "../countDamageByCause";
import { sumJobCost } from "../sumJobCost";
import { rankUnits } from "../rankUnits";
import { buildSpendBars } from "../buildSpendBars";
import {
  STATS_JOBS,
  STATS_REPORTS,
} from "./equipmentStats.constants";

describe("equipment months", () => {
  it("lists the last months crossing the year", () => {
    expect(listRecentMonths("2026-02", 4)).toEqual([
      "2025-11",
      "2025-12",
      "2026-01",
      "2026-02",
    ]);
    expect(shiftMonthKey("2026-12", 1)).toBe("2027-01");
  });

  it("names months and days in Spanish", () => {
    expect(formatMonthName("2026-11")).toBe(
      "Noviembre 2026"
    );
    expect(formatShortDay("2026-11-05")).toContain("5");
  });

  it("uses the day in Costa Rica", () => {
    expect(toCostaRicaDate("2026-11-26T04:30:00Z")).toBe(
      "2026-11-25"
    );
  });
});

describe("equipment stats", () => {
  it("counts only finished reports by cause", () => {
    expect(countDamageByCause(STATS_REPORTS)).toEqual({
      collision: 2,
      machine_failure: 0,
      other: 0,
      rollover: 1,
    });
  });

  it("adds each currency on its own without float drift", () => {
    expect(sumJobCost(STATS_JOBS, "CRC")).toBe(30);
    expect(sumJobCost(STATS_JOBS, "USD")).toBe(0.3);
  });

  it("ranks the machines and drops the ones with nothing", () => {
    expect(
      rankUnits(
        [
          { amount: 1, unitCode: "B", unitId: "b" },
          { amount: 2, unitCode: "C", unitId: "c" },
          { amount: 1, unitCode: "B", unitId: "b" },
          { amount: 0, unitCode: "A", unitId: "a" },
        ],
        3
      ).map((unit) => unit.unitCode)
    ).toEqual(["B", "C"]);
  });

  it("builds one bar per month", () => {
    const bars = buildSpendBars({
      currency: "CRC",
      currentMonth: "2026-11",
      jobs: STATS_JOBS,
      months: ["2026-10", "2026-11"],
      resolveHref: (month) => month,
    });

    expect(
      bars.map((bar) => [bar.amount, bar.isCurrent])
    ).toEqual([
      [10, false],
      [20, true],
    ]);
  });

  it("draws an empty bar when there is nothing to compare", () => {
    expect(resolveBarShare(0, 0)).toBe("0%");
    expect(resolveBarShare(1, 4)).toBe("25%");
  });
});
