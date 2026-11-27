import {
  DAMAGE_PERIOD,
  DAMAGE_REPORTS_QUERY,
  DAMAGE_TAB,
} from "../constants/DamageReports.constants";
import type { DamageFilters } from "../models/DamageFilters.interface";

export const buildDamageViewQuery = (
  next: DamageFilters,
  changes: Partial<DamageFilters>
): URLSearchParams => {
  const query = new URLSearchParams();

  if (next.tab === DAMAGE_TAB.CHARTS) {
    query.set(DAMAGE_REPORTS_QUERY.TAB, next.tab);

    if (next.period !== DAMAGE_PERIOD.MONTH) {
      query.set(DAMAGE_REPORTS_QUERY.PERIOD, next.period);
    }

    return query;
  }

  query.set(DAMAGE_REPORTS_QUERY.MONTH, next.month);

  if (!changes.month || changes.day) {
    query.set(DAMAGE_REPORTS_QUERY.DAY, next.day);
  }

  if (next.cause) {
    query.set(DAMAGE_REPORTS_QUERY.CAUSE, next.cause);
  }

  return query;
};
