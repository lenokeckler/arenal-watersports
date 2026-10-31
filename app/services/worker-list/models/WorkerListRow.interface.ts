import type { Nullable, WorkArea } from "@/app/types";
import type { WorkerListBaseRole } from "./WorkerListBaseRole.type";
import type { WorkerListStatus } from "./WorkerListStatus.type";
import type { WorkerMark } from "@/app/constants/supabase/SupabaseWorkerMark.constants";

export interface WorkerListRow {
  accountStatus: WorkerListStatus;
  additionalAreas: readonly WorkArea[];
  baseRole: WorkerListBaseRole;
  expiresAt: Nullable<string>;
  fullName: string;
  id: string;
  isExternalGuide: boolean;
  marks: readonly WorkerMark[];
  username: string;
}
