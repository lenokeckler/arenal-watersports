import type { WorkerAreasOverview } from "@/app/services/worker-areas/models/WorkerAreasOverview.interface";
import type { NullableRef } from "@/app/types";

export interface WorkerAreasResultProps {
  overview: NullableRef<WorkerAreasOverview>;
  username: string;
}
