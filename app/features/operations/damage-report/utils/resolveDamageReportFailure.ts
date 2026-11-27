import { DAMAGE_REPORT_FAILURE } from "../constants/DamageReport.constants";
import { DAMAGE_REPORT_COPY } from "../constants/DamageReportCopy.constants";
import type { DamageReportFailure } from "../models/DamageReportFailure.interface";
import { safeString } from "@/app/utils/safe-value/SafeValue";

export const resolveDamageReportFailure = ({
  code,
  message,
}: DamageReportFailure): string => {
  if (
    message.includes(DAMAGE_REPORT_FAILURE.OUT_ON_WATER)
  ) {
    return DAMAGE_REPORT_COPY.OUT_ON_WATER;
  }

  if (
    message.includes(DAMAGE_REPORT_FAILURE.ALREADY_COMPLETE)
  ) {
    return DAMAGE_REPORT_COPY.ALREADY_COMPLETE;
  }

  const byCode: Record<string, string> = {
    [DAMAGE_REPORT_FAILURE.FORBIDDEN]:
      DAMAGE_REPORT_COPY.FORBIDDEN,
    [DAMAGE_REPORT_FAILURE.INVALID]:
      DAMAGE_REPORT_COPY.INVALID,
    [DAMAGE_REPORT_FAILURE.NOT_ALLOWED]:
      DAMAGE_REPORT_COPY.RETIRED,
    [DAMAGE_REPORT_FAILURE.NOT_FOUND]:
      DAMAGE_REPORT_COPY.REPORT_NOT_FOUND,
  };

  return (
    byCode[safeString(code)] ?? DAMAGE_REPORT_COPY.ERROR
  );
};
