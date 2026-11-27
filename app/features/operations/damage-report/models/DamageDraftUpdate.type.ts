import type { DamageReportDraft } from "./DamageReportDraft.interface";

export type DamageDraftUpdate = (
  changes: Partial<DamageReportDraft>
) => void;
