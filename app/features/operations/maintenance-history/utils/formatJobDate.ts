import { MAINTENANCE_HISTORY_DATE_SEPARATOR } from "../constants/MaintenanceHistoryCopy.constants";

export const formatJobDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-");

  return [day, month, year].join(
    MAINTENANCE_HISTORY_DATE_SEPARATOR
  );
};
