import type { WorkArea } from "@/app/types";
import type { NullableRef } from "@/app/types";
import type { WorkerMark } from "@/app/constants";

export interface WorkerListFilterFixtureWorkerOptions {
  baseRole: WorkArea;
  expiresAt: NullableRef<string>;
  fullName: string;
  isExternalGuide: boolean;
  mark: NullableRef<WorkerMark>;
}
