"use server";

import { createDamageReport } from "../services/createDamageReport";
import type { CreateDamageReportInput } from "../services/createDamageReport";
import type { DamageReportSubmissionResult } from "../models/DamageReportSubmissionResult.type";

export const submitDamageReport = async (
  input: CreateDamageReportInput
): Promise<DamageReportSubmissionResult> => {
  try {
    await createDamageReport(input);

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "No se pudo registrar el reporte de daño.",
    };
  }
};
