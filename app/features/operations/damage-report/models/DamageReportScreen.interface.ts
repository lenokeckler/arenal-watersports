import type { NullableRef } from "@/app/types";
import type { DamageReportUnit } from "./DamageReportUnit.interface";
import type { PendingDamageReport } from "./PendingDamageReport.interface";

export interface DamageReportScreen {
  pending: NullableRef<PendingDamageReport>;
  presetUnitId: NullableRef<string>;
  units: DamageReportUnit[];
}
