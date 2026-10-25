import type {
  GrantableWorkerArea,
  GrantableWorkerMark,
  WorkerAreaIntent,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";

export interface WorkerAreasSearch {
  area: NullableRef<GrantableWorkerArea>;
  mark: NullableRef<GrantableWorkerMark>;
  markNotice: NullableRef<WorkerAreaIntent>;
  notice: NullableRef<WorkerAreaIntent>;
  username: string;
}
