import { DAY_PANEL_OPEN } from "@/app/components/day-panel/constants/DayPanel.constants";
import { DAMAGE_CAUSE_ORDER } from "@/app/constants";
import { resolveSelectedDay } from "@/app/utils/equipment-months/resolveSelectedDay";
import { resolveQueryChoice } from "@/app/utils/query-param/resolveQueryChoice";
import {
  DAMAGE_PERIOD,
  DAMAGE_REPORTS_QUERY,
  DAMAGE_TAB,
} from "../constants/DamageReports.constants";
import type { DamageFilters } from "../models/DamageFilters.interface";
import type { DamageOverview } from "../models/DamageOverview.interface";
import type { DamageReportsProps } from "../models/DamageReportsProps.interface";
import { filterByCause } from "./filterByCause";

export const resolveDamageFilters = (
  params: NonNullable<DamageReportsProps["searchParams"]>,
  { calendarReports, month, today }: DamageOverview
): DamageFilters => {
  const cause = resolveQueryChoice(
    params[DAMAGE_REPORTS_QUERY.CAUSE],
    DAMAGE_CAUSE_ORDER
  );

  return {
    cause,
    day: resolveSelectedDay({
      entryDates: filterByCause(calendarReports, cause).map(
        (report) => report.date
      ),
      month,
      requested: params[DAMAGE_REPORTS_QUERY.DAY],
      today,
    }),
    isDayOpen:
      params[DAY_PANEL_OPEN.PARAM] === DAY_PANEL_OPEN.VALUE,
    month,
    period:
      resolveQueryChoice(
        params[DAMAGE_REPORTS_QUERY.PERIOD],
        Object.values(DAMAGE_PERIOD)
      ) ?? DAMAGE_PERIOD.MONTH,
    showPending:
      params[DAMAGE_REPORTS_QUERY.PENDING] ===
      DAMAGE_REPORTS_QUERY.PENDING_OPEN,
    tab:
      resolveQueryChoice(
        params[DAMAGE_REPORTS_QUERY.TAB],
        Object.values(DAMAGE_TAB)
      ) ?? DAMAGE_TAB.CALENDAR,
  };
};
