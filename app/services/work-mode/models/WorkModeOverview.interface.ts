import type { NullableRef, WorkArea } from "@/app/types";

export interface WorkModeOverview {
  areas: readonly WorkArea[];
  current: NullableRef<WorkArea>;
}
