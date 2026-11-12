import type {
  WorkerAccountState,
  WorkerMark,
} from "@/app/constants";
import type { WorkArea } from "@/app/types";

export interface WorkerAreasOverview {
  accountState: WorkerAccountState;
  areas: readonly WorkArea[];
  baseRole: WorkArea;
  fullName: string;
  hasPersonalEmail: boolean;
  id: string;
  isExternalGuide: boolean;
  marks: readonly WorkerMark[];
  username: string;
}
