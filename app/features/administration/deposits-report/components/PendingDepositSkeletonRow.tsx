import { DepositSkeletonSummary } from "@/app/components";
import { PENDING_DEPOSIT_SKELETON_ROW_CLASS } from "../styles/DepositsReport.styles";

const PendingDepositSkeletonRow = (): React.JSX.Element => (
  <div className={PENDING_DEPOSIT_SKELETON_ROW_CLASS}>
    <DepositSkeletonSummary />
  </div>
);

export default PendingDepositSkeletonRow;
