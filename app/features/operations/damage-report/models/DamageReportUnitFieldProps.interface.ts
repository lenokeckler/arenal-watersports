import type { NullableRef } from "@/app/types";
import type { DamageReportFormViewModel } from "./DamageReportFormViewModel.interface";
import type { DamageReportUnit } from "./DamageReportUnit.interface";

export interface DamageReportUnitFieldProps {
  error: NullableRef<string>;
  isLocked: boolean;
  onChange: DamageReportFormViewModel["handleUnitChange"];
  selectedUnit: NullableRef<DamageReportUnit>;
  units: DamageReportUnit[];
  value: string;
}
