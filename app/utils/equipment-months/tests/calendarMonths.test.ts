import { describe, expect, it } from "vitest";
import {
  buildMonthDays,
  countLeadingBlanks,
} from "../buildMonthDays";
import { buildMonthRange } from "../buildMonthRange";
import { isRealDay } from "../isRealDay";
import { listCalendarMonths } from "../listCalendarMonths";
import { resolveSelectedDay } from "../resolveSelectedDay";

const LEAP_MONTH = "2028-02";
const LEAP_DAYS = 29;
const SUNDAY_START_BLANKS = 6;
const MONTH_CAP = 120;
const RECENT = ["2026-10", "2026-11"];
const TODAY = "2026-11-25";

describe("month days", () => {
  it("counts the days of a leap February", () => {
    expect(buildMonthDays(LEAP_MONTH, TODAY)).toHaveLength(
      LEAP_DAYS
    );
  });

  it("marks today and what has not happened yet", () => {
    const days = buildMonthDays("2026-11", TODAY);
    const today = days.find((day) => day.isToday);

    expect(today?.isoDate).toBe(TODAY);
    expect(
      days.filter((day) => day.isFuture).at(0)?.isoDate
    ).toBe("2026-11-26");
  });

  it("starts the week on Monday", () => {
    expect(countLeadingBlanks("2026-11")).toBe(
      SUNDAY_START_BLANKS
    );
  });

  it("ranges a month across the end of the year", () => {
    expect(buildMonthRange("2026-12")).toEqual({
      before: "2027-01-01",
      since: "2026-12-01",
    });
  });
});

describe("isRealDay", () => {
  it.each(["2026-11-31", "2026-13-01", "11/25/2026", ""])(
    "refuses %s",
    (value) => {
      expect(isRealDay(value)).toBe(false);
    }
  );

  it("accepts a day that exists", () => {
    expect(isRealDay(TODAY)).toBe(true);
  });
});

describe("listCalendarMonths", () => {
  it("goes back to the month of the first record", () => {
    expect(
      listCalendarMonths(RECENT, "2026-08-14")
    ).toEqual(["2026-08", "2026-09", ...RECENT]);
  });

  it("keeps the recent months when there is no older record", () => {
    expect(listCalendarMonths(RECENT, null)).toEqual(
      RECENT
    );
  });

  it("stops after ten years", () => {
    expect(
      listCalendarMonths(RECENT, "1900-01-01")
    ).toHaveLength(MONTH_CAP);
  });
});

describe("resolveSelectedDay", () => {
  const request = {
    entryDates: ["2026-10-09", "2026-10-02"],
    month: "2026-10",
    requested: undefined,
    today: TODAY,
  };

  it("opens a past month on its latest entry", () => {
    expect(resolveSelectedDay(request)).toBe("2026-10-09");
  });

  it("falls back to the first day of an empty month", () => {
    expect(
      resolveSelectedDay({ ...request, entryDates: [] })
    ).toBe("2026-10-01");
  });

  it("ignores a requested day outside the month", () => {
    expect(
      resolveSelectedDay({
        ...request,
        requested: "2026-09-30",
      })
    ).toBe("2026-10-09");
  });
});
