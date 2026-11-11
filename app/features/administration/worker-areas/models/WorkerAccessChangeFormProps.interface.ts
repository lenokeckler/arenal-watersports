import type { WorkerAreaIntent } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { WorkerAccessChangeLabels } from "./WorkerAccessChangeLabels.interface";

export interface WorkerAccessChangeFormProps<
  Result extends string,
> {
  action: (
    previousState: NullableRef<Result>,
    formData: FormData
  ) => Promise<NullableRef<Result>>;
  errorCopy: Record<Result, string>;
  intent: WorkerAreaIntent;
  labels: WorkerAccessChangeLabels;
  targetName: string;
  targetValue: string;
  username: string;
  workerId: string;
}
