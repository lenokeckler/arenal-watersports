import { DAMAGE_REPORT_QUERY } from "../constants/DamageReport.constants";

export const buildTripsSince = (): string =>
  new Date(
    Date.now() -
      DAMAGE_REPORT_QUERY.TRIP_DAYS *
        DAMAGE_REPORT_QUERY.MILLISECONDS_PER_DAY
  ).toISOString();
