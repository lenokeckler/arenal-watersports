import { Text } from "@/app/components";
import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";
import type { RetainedDepositReasonProps } from "../models/RetainedDepositReasonProps.interface";
import {
  RETAINED_REASON_CLASS,
  RETAINED_REASON_LABEL_CLASS,
  RETAINED_REASON_TEXT_CLASS,
} from "../styles/DepositsReport.styles";
import { resolveRetentionReason } from "../utils/resolveRetentionReason";

const RetainedDepositReason = ({
  reason,
}: RetainedDepositReasonProps): React.JSX.Element => (
  <div className={RETAINED_REASON_CLASS}>
    <Text className={RETAINED_REASON_LABEL_CLASS}>
      {DEPOSITS_REPORT_COPY.RETENTION_REASON_LABEL}
    </Text>
    <Text className={RETAINED_REASON_TEXT_CLASS}>
      {resolveRetentionReason(reason)}
    </Text>
  </div>
);

export default RetainedDepositReason;
