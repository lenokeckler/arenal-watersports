import { describe, expect, it } from "vitest";
import { buildAttentionList } from "../utils/buildAttentionList";
import { buildCalendarDays } from "../utils/buildCalendarDays";
import { buildDayTotals } from "../utils/buildDayTotals";
import { buildMaintenanceHref } from "../utils/buildMaintenanceHref";
import { resolveMaintenanceFilters } from "../utils/resolveMaintenanceFilters";
import {
  CALENDAR_UNIT_ID,
  MAINTENANCE_DATA,
  MAINTENANCE_JOBS,
} from "./MaintenanceData.constants";

const TODAY = "2026-11-25";
const DAYS_IN_NOVEMBER = 30;
const JOB_INDEX = 21;
const TODAY_INDEX = 24;

const filtersFor = (params: Record<string, string> = {}) =>
  resolveMaintenanceFilters(params, MAINTENANCE_DATA);

const daysFor = (params: Record<string, string> = {}) =>
  buildCalendarDays({
    data: MAINTENANCE_DATA,
    filters: filtersFor(params),
  });

const countMarks = (
  params: Record<string, string>,
  index: number
) => daysFor(params)[index].marks.map((mark) => mark.count);

describe("maintenance filters", () => {
  it("opens the calendar on today with the day closed", () => {
    expect(filtersFor()).toMatchObject({
      currency: "CRC",
      day: TODAY,
      isDayOpen: false,
      machineId: null,
      month: "2026-11",
      showAttention: false,
      tab: "calendar",
    });
  });

  it("ignores forged values in the address", () => {
    expect(
      filtersFor({
        attend: "yes",
        currency: "EUR",
        day: "2026-11-31",
        machine: "1 or 1=1",
        panel: "x",
        tab: "admin",
      })
    ).toEqual(filtersFor());
  });

  it("never selects a day in the future", () => {
    expect(filtersFor({ day: "2026-11-29" }).day).toBe(
      TODAY
    );
  });

  it("drops the day when the month changes", () => {
    expect(
      buildMaintenanceHref(filtersFor(), {
        month: "2026-10",
      })
    ).not.toContain("day=");
  });
});

describe("maintenance calendar", () => {
  it("marks jobs and damage on their days", () => {
    const days = daysFor();

    expect(days).toHaveLength(DAYS_IN_NOVEMBER);
    expect(countMarks({}, JOB_INDEX)).toEqual([1, 0]);
    expect(countMarks({}, TODAY_INDEX)).toEqual([0, 1]);
    expect(days[TODAY_INDEX + 1].isFuture).toBe(true);
  });

  it("keeps only the chosen machine on the calendar", () => {
    const params = { machine: CALENDAR_UNIT_ID };

    expect(countMarks(params, TODAY_INDEX)).toEqual([0, 0]);
    expect(countMarks(params, JOB_INDEX)).toEqual([1, 0]);
  });

  it("adds up the day by currency", () => {
    expect(buildDayTotals(MAINTENANCE_JOBS, 0)).toMatch(
      /^2 trabajos · .+ · .+$/
    );
  });
});

describe("buildAttentionList", () => {
  it("puts the most overdue oil first and lists each machine once", () => {
    expect(
      buildAttentionList(MAINTENANCE_DATA.overview).map(
        (unit) => unit.code
      )
    ).toEqual(["JS-3", "JS-1", "CU-1", "JS-4", "JS-2"]);
  });
});
