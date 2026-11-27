import type { DamageReportInput } from "./DamageReportInput.interface";

export type DamageReportCompletion = DamageReportInput & {
  reportId: string;
};
