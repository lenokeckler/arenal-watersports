"use server";

import { createDamageReport } from "../services/createDamageReport";
import type { CreateDamageReportInput } from "../models/CreateDamageReportInput.interface";
import type { DamageReportSubmissionResult } from "../models/DamageReportSubmissionResult.type";

export const submitDamageReport = async (
  input: CreateDamageReportInput
): Promise<DamageReportSubmissionResult> => {
  await createDamageReport(input);

  return { ok: true };
};
