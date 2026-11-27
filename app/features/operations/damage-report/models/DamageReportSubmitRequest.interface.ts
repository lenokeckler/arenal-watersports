import type { DamageReportDraft } from "./DamageReportDraft.interface";
import type { DamageReportErrors } from "./DamageReportErrors.interface";
import type { DamageReportScreen } from "./DamageReportScreen.interface";

export interface DamageReportSubmitRequest {
  draft: DamageReportDraft;
  onValidated: (errors: DamageReportErrors) => void;
  screen: DamageReportScreen;
}
