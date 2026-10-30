import type {
  WorkerListBaseRole,
  WorkerListStatus,
} from "@/app/constants/administration/WorkerList.constants";
import type { Nullable, WorkArea } from "@/app/types";
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
