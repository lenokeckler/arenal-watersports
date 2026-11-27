import type { DAMAGE_TAB } from "../constants/DamageReports.constants";

export type DamageTab =
  (typeof DAMAGE_TAB)[keyof typeof DAMAGE_TAB];
