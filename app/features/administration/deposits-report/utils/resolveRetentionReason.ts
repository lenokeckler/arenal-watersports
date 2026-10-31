import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";

export const resolveRetentionReason = (
  reason: string
): string =>
  reason.trim() === ""
    ? DEPOSITS_REPORT_COPY.NO_REASON
    : reason;
