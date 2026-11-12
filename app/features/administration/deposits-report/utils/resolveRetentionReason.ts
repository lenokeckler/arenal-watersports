import { STRING } from "@/app/constants";
import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";

export const resolveRetentionReason = (
  reason: string
): string =>
  reason.trim() === STRING.Empty
    ? DEPOSITS_REPORT_COPY.NO_REASON
    : reason;
