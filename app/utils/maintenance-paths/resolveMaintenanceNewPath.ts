import {
  MAINTENANCE_JOB_QUERY_PARAM,
  PATHS,
} from "@/app/constants";

export const resolveMaintenanceNewPath = (
  unitId: string
): string => {
  const params = new URLSearchParams({
    [MAINTENANCE_JOB_QUERY_PARAM.UNIT]: unitId,
  });

  return `${PATHS.OPERATIONS.MAINTENANCE_NEW}?${params.toString()}`;
};
