import type {
  GrantableWorkerArea,
  WorkerAreaIntent,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";

export interface WorkerAreasSearch {
  area: NullableRef<GrantableWorkerArea>;
  notice: NullableRef<WorkerAreaIntent>;
  username: string;
}
