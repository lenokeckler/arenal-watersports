import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitMaintenanceJob } from "../models/CategoryUnitMaintenanceJob.interface";

const META_SEPARATOR = " · ";

export const resolveJobMeta = ({
  cost,
  isExternal,
}: CategoryUnitMaintenanceJob): string =>
  [
    cost,
    isExternal
      ? CATEGORY_UNITS_COPY.STATUS_EXTERNAL_WORKSHOP
      : null,
  ]
    .filter((part) => part !== null)
    .map((part) => `${META_SEPARATOR}${part}`)
    .join("");
