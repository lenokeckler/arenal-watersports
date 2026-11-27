import { DAY_PANEL_OPEN } from "@/app/components/day-panel/constants/DayPanel.constants";
import { PATHS } from "@/app/constants";
import { DAMAGE_REPORTS_QUERY } from "../constants/DamageReports.constants";
import type { DamageFilters } from "../models/DamageFilters.interface";
import { buildDamageViewQuery } from "./buildDamageViewQuery";

export const buildDamageReportsHref = (
  filters: DamageFilters,
  changes: Partial<DamageFilters> = {}
): string => {
  const query = buildDamageViewQuery(
    { ...filters, ...changes },
    changes
  );

  if (changes.isDayOpen) {
    query.set(DAY_PANEL_OPEN.PARAM, DAY_PANEL_OPEN.VALUE);
  }

  if (changes.showPending) {
    query.set(
      DAMAGE_REPORTS_QUERY.PENDING,
      DAMAGE_REPORTS_QUERY.PENDING_OPEN
    );
  }

  return `${PATHS.OPERATIONS.DAMAGE_REPORTS}?${query.toString()}`;
};
