import type { WorkerAreaIntent } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export interface WorkerAreaStatus {
  intent: NullableRef<WorkerAreaIntent>;
  label: string;
}
