import type { ReactNode } from "react";
import type { NullableRef } from "@/app/types";
import type { WorkModeOverview } from "@/app/services/work-mode/models/WorkModeOverview.interface";

export interface SystemScreenProps {
  children: ReactNode;
  overview: NullableRef<WorkModeOverview>;
}
