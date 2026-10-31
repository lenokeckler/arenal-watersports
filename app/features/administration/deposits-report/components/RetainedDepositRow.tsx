import { DepositSummary } from "@/app/components";
import type { RetainedDepositRowProps } from "../models/RetainedDepositRowProps.interface";
import { RETAINED_DEPOSIT_ROW_CLASS } from "../styles/DepositsReport.styles";
import RetainedDepositReason from "./RetainedDepositReason";

const RetainedDepositRow = ({
  deposit,
}: RetainedDepositRowProps): React.JSX.Element => (
  <div className={RETAINED_DEPOSIT_ROW_CLASS}>
    <DepositSummary
      customerName={deposit.reservation.customerName}
      code={deposit.reservation.code}
      amount={deposit.retainedAmount}
      currency={deposit.currency}
    />
    <RetainedDepositReason
      reason={deposit.retentionReason}
    />
  </div>
);

export default RetainedDepositRow;
