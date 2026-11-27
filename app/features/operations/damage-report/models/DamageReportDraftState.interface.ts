import type { NullableRef } from "@/app/types";
import type { DamageDraftHandlers } from "./DamageDraftHandlers.type";
import type { DamageReportDraft } from "./DamageReportDraft.interface";
import type { DamageReportErrors } from "./DamageReportErrors.interface";
import type { DamageReportUnit } from "./DamageReportUnit.interface";

export interface DamageReportDraftState {
  draft: DamageReportDraft;
  errors: DamageReportErrors;
  handlers: DamageDraftHandlers;
  selectedUnit: NullableRef<DamageReportUnit>;
  setErrors: (errors: DamageReportErrors) => void;
}
