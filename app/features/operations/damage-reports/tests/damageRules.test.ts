import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { buildDamageReportsHref } from "../utils/buildDamageReportsHref";
import { resolveDamageFilters } from "../utils/resolveDamageFilters";
import { summarizeDamage } from "../utils/summarizeDamage";
import {
  DAMAGE_DAY,
  DAMAGE_FILTERS,
  DAMAGE_MONTH,
  DAMAGE_OVERVIEW,
  DAMAGE_TODAY,
} from "./DamageReports.constants";

const MONTH_TOTAL = 5;
const SIX_MONTH_TOTAL = 6;
const CALENDAR_HREF = `${PATHS.OPERATIONS.DAMAGE_REPORTS}?month=${DAMAGE_MONTH}`;

describe("summarizeDamage", () => {
  it("counts the month, including what is still to be completed", () => {
    const summary = summarizeDamage(
      DAMAGE_OVERVIEW,
      DAMAGE_FILTERS
    );

    expect(summary.periodTotal).toBe(MONTH_TOTAL);
    expect(summary.causeCounts).toEqual({
      collision: 3,
      machine_failure: 0,
      other: 0,
      rollover: 1,
    });
    expect(summary.hasPendingInPeriod).toBe(true);
    expect(
      summary.topUnits.map((unit) => unit.unitCode)
    ).toEqual(["JET-01", "JET-04", "KD-02"]);
  });

  it("widens to six months", () => {
    expect(
      summarizeDamage(DAMAGE_OVERVIEW, { period: "six" })
        .periodTotal
    ).toBe(SIX_MONTH_TOTAL);
  });
});

describe("buildDamageReportsHref", () => {
  it("keeps the month, the day and the cause of the calendar", () => {
    expect(
      buildDamageReportsHref(DAMAGE_FILTERS, {
        cause: "rollover",
      })
    ).toBe(
      `${CALENDAR_HREF}&day=${DAMAGE_DAY}&cause=rollover`
    );
  });

  it("drops the day when the month changes", () => {
    expect(
      buildDamageReportsHref(DAMAGE_FILTERS, {
        month: DAMAGE_MONTH,
      })
    ).toBe(CALENDAR_HREF);
  });

  it("opens the day panel and the pending sheet only on request", () => {
    expect(
      buildDamageReportsHref(DAMAGE_FILTERS, {
        isDayOpen: true,
        showPending: true,
      })
    ).toBe(
      `${CALENDAR_HREF}&day=${DAMAGE_DAY}&panel=day&pending=open`
    );
  });

  it("keeps only the period on the charts", () => {
    expect(
      buildDamageReportsHref(DAMAGE_FILTERS, {
        period: "six",
        tab: "charts",
      })
    ).toBe(
      `${PATHS.OPERATIONS.DAMAGE_REPORTS}?tab=charts&period=six`
    );
  });
});

describe("resolveDamageFilters", () => {
  it("ignores forged values", () => {
    expect(
      resolveDamageFilters(
        {
          cause: "nope",
          day: "2026-13-40",
          panel: "x",
          pending: "x",
          period: "ten",
          tab: "x",
        },
        DAMAGE_OVERVIEW
      )
    ).toEqual({ ...DAMAGE_FILTERS, day: DAMAGE_TODAY });
  });
});
