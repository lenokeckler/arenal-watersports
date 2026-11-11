import { MAINTENANCE_COST_DATE_SEPARATOR } from "../constants/MaintenanceCostReportCopy.constants";

export const formatLastJobDate = (
  isoDate: string
): string => {
  const [year, month, day] = isoDate.split("-");

  return [day, month, year].join(
    MAINTENANCE_COST_DATE_SEPARATOR
  );
};
