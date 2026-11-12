import { PATHS, SUPABASE_WORK_AREA } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { WorkModeOverview } from "@/app/services/work-mode/models/WorkModeOverview.interface";

export const shouldShowSystemNavigation = (
  overview: NullableRef<WorkModeOverview>,
  pathname: string
): boolean => {
  if (overview === null || overview.current === null) {
    return false;
  }

  const area = overview.current;
  const isSupportedArea =
    area === SUPABASE_WORK_AREA.ADMINISTRATION ||
    area === SUPABASE_WORK_AREA.OPERATIONS ||
    area === SUPABASE_WORK_AREA.RESERVATIONS;
  const isCurrentAreaGranted =
    overview.areas.includes(area);
  const isModeSelectionPath = pathname === PATHS.MODE;

  return (
    isSupportedArea &&
    isCurrentAreaGranted &&
    !isModeSelectionPath
  );
};
