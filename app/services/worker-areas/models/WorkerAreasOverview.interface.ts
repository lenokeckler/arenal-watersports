import type {
  WorkerAccountState,
  WorkerMark,
} from "@/app/constants";
import type { NullableRef, WorkArea } from "@/app/types";

export interface WorkerAreasOverview {
  accountState: WorkerAccountState;
  areas: readonly WorkArea[];
  baseRole: WorkArea;
  expiresAt: NullableRef<string>;
  fullName: string;
  hasPersonalEmail: boolean;
  id: string;
  isExternalGuide: boolean;
  marks: readonly WorkerMark[];
  username: string;
}
