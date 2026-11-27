import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitMaintenanceJob } from "../models/CategoryUnitMaintenanceJob.interface";

const TITLE_SEPARATOR = " · ";

export const resolveJobTitle = ({
  description,
  workType,
}: CategoryUnitMaintenanceJob): string => {
  const label =
    CATEGORY_UNITS_COPY.STATUS_WORK_TYPES[workType] ??
    workType;

  return description
    ? [label, description].join(TITLE_SEPARATOR)
    : label;
};
