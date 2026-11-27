import type { NullableRef } from "@/app/types";
import type { DamageReportDraft } from "./DamageReportDraft.interface";
import type { DamageReportFormViewModel } from "./DamageReportFormViewModel.interface";
import type { DamageReportUnit } from "./DamageReportUnit.interface";

export interface DamageReportAftermathProps {
  draft: DamageReportDraft;
  hasNotedTrip: boolean;
  onStateChange: DamageReportFormViewModel["handleStateChange"];
  onTripChange: DamageReportFormViewModel["handleTripChange"];
  selectedUnit: NullableRef<DamageReportUnit>;
}
