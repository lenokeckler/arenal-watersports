import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ARIA_ROLE } from "@/app/constants";
import MonthCalendar from "../MonthCalendar";
import { MONTH_CALENDAR_COPY } from "../constants/MonthCalendarCopy.constants";
import {
  CALENDAR_DAYS,
  PREVIOUS_HREF,
} from "./MonthCalendar.constants";

const renderCalendar = () =>
  render(
    <MonthCalendar
      days={CALENDAR_DAYS}
      label="Calendario"
      legend={["job", "damage"]}
      month="2026-11"
      nextHref={null}
      previousHref={PREVIOUS_HREF}
    />
  );

const queryLink = (name: string) =>
  screen.queryByRole(ARIA_ROLE.LINK, { name });

describe("MonthCalendar", () => {
  afterEach(cleanup);

  it("offers only the months that exist", () => {
    renderCalendar();

    expect(
      queryLink(MONTH_CALENDAR_COPY.PREVIOUS_MONTH)
    ).toHaveAttribute("href", PREVIOUS_HREF);
    expect(
      queryLink(MONTH_CALENDAR_COPY.NEXT_MONTH)
    ).not.toBeInTheDocument();
  });

  it("links past days, marks the chosen one and never a future day", () => {
    renderCalendar();

    expect(
      queryLink(CALENDAR_DAYS[0].label)
    ).toHaveAttribute("aria-current", "page");
    expect(
      queryLink(CALENDAR_DAYS[1].label)
    ).not.toBeInTheDocument();
  });
});
