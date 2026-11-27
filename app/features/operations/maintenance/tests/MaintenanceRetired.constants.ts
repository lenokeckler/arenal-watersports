import {
  MAINTENANCE_DATA,
  MAINTENANCE_JOBS,
} from "./MaintenanceData.constants";

export const RETIRED_JOB = {
  ...MAINTENANCE_JOBS[0],
  isRetired: true,
};

export const RETIRED_DATA = {
  ...MAINTENANCE_DATA,
  calendar: { jobs: [RETIRED_JOB], reports: [] },
  jobs: [RETIRED_JOB],
};
