import type {
  WorkerListBaseRole,
  WorkerListStatus,
} from "@/app/constants/administration/WorkerList.constants";
import type { NullableUndefined } from "@/app/types";

export interface WorkerListSearch {
  baseRole: NullableUndefined<WorkerListBaseRole>;
  pageIndex: number;
  status: NullableUndefined<WorkerListStatus>;
}
