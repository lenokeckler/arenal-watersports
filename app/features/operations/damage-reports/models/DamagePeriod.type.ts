import type { DAMAGE_PERIOD } from "../constants/DamageReports.constants";

export type DamagePeriod =
  (typeof DAMAGE_PERIOD)[keyof typeof DAMAGE_PERIOD];
