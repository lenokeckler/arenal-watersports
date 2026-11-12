import type {
  GrantableWorkerArea,
  WorkerAccountResult,
  GrantableWorkerMark,
  WorkerAreaIntent,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";

export interface WorkerAreasSearch {
  accountNotice: NullableRef<WorkerAccountResult>;
  area: NullableRef<GrantableWorkerArea>;
  mark: NullableRef<GrantableWorkerMark>;
  markNotice: NullableRef<WorkerAreaIntent>;
  notice: NullableRef<WorkerAreaIntent>;
  username: string;
}
