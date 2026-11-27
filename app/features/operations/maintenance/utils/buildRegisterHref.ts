import {
  MAINTENANCE_JOB_QUERY_PARAM,
  PATHS,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";

export const buildRegisterHref = (
  day: string,
  machineId: NullableRef<string>
): string => {
  const query = new URLSearchParams({
    [MAINTENANCE_JOB_QUERY_PARAM.DATE]: day,
  });

  if (machineId) {
    query.set(MAINTENANCE_JOB_QUERY_PARAM.UNIT, machineId);
  }

  return `${PATHS.OPERATIONS.MAINTENANCE_NEW}?${query.toString()}`;
};
