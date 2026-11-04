import { DepositSkeletonSummary } from "@/app/components";
import {
  RETAINED_DEPOSIT_SKELETON_ROW_CLASS,
  RETAINED_SKELETON_REASON_CLASS,
} from "../styles/DepositsReport.styles";

const RetainedDepositSkeletonRow =
  (): React.JSX.Element => (
    <div className={RETAINED_DEPOSIT_SKELETON_ROW_CLASS}>
      <DepositSkeletonSummary />
      <div className={RETAINED_SKELETON_REASON_CLASS} />
    </div>
  );

export default RetainedDepositSkeletonRow;
