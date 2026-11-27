"use server";

import { revalidatePath } from "next/cache";
import { PATHS } from "@/app/constants";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportInput } from "../models/DamageReportInput.interface";
import type { DamageReportResult } from "../models/DamageReportResult.type";
import { saveDamageReport } from "../services/saveDamageReport";
import { isDamageReportInput } from "../utils/isDamageReportInput";

export const submitDamageReport = async (
  input: DamageReportInput
): Promise<DamageReportResult> => {
  if (!isDamageReportInput(input)) {
    return {
      message: DAMAGE_REPORT_COPY.INVALID,
      ok: false,
    };
  }

  try {
    const result = await saveDamageReport(input);

    if (result.ok) {
      revalidatePath(PATHS.OPERATIONS.DAMAGE_REPORTS);
      revalidatePath(PATHS.OPERATIONS.EQUIPMENT);
      revalidatePath(PATHS.BOARD);
    }

    return result;
  } catch (error) {
    return {
      message:
        error instanceof OperationsAccessError
          ? DAMAGE_REPORT_COPY.FORBIDDEN
          : DAMAGE_REPORT_COPY.ERROR,
      ok: false,
    };
  }
};
