import type { NullableRef } from "@/app/types";
import type { WorkModeOverview } from "@/app/services/work-mode/models/WorkModeOverview.interface";

export interface WorkModeSwitchProps {
  overview: NullableRef<WorkModeOverview>;
}
