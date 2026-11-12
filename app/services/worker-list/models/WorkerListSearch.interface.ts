import type { NullableUndefined } from "@/app/types";
import type { WorkerListBaseRole } from "./WorkerListBaseRole.type";
import type { WorkerListStatus } from "./WorkerListStatus.type";

export interface WorkerListSearch {
  baseRole: NullableUndefined<WorkerListBaseRole>;
  pageIndex: number;
  status: NullableUndefined<WorkerListStatus>;
}
