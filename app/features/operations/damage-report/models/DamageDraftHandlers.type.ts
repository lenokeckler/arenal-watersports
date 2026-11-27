import type { DamageReportFormViewModel } from "./DamageReportFormViewModel.interface";

export type DamageDraftHandlers = Pick<
  DamageReportFormViewModel,
  | "handleCauseChange"
  | "handleDescriptionChange"
  | "handleHitsChange"
  | "handleStateChange"
  | "handleTripChange"
  | "handleUnitChange"
>;
