import type { NullableRef } from "@/app/types";
import { submitDamageReport } from "../actions/submitDamageReport";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportInput } from "../models/DamageReportInput.interface";

export const requestDamageReport = async (
  input: DamageReportInput
): Promise<NullableRef<string>> => {
  try {
    const result = await submitDamageReport(input);

    return result.ok ? null : result.message;
  } catch {
    return DAMAGE_REPORT_COPY.ERROR;
  }
};
