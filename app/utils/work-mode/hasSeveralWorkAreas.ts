import { MULTI_AREA_MINIMUM } from "@/app/constants";
import type { WorkModeOverview } from "@/app/services/work-mode/models/WorkModeOverview.interface";

export const hasSeveralWorkAreas = ({
  areas,
}: WorkModeOverview): boolean =>
  areas.length >= MULTI_AREA_MINIMUM;
