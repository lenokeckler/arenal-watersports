import { DepositSummary } from "@/app/components";
import type { PendingDepositRowProps } from "../models/PendingDepositRowProps.interface";
import { PENDING_DEPOSIT_ROW_CLASS } from "../styles/DepositsReport.styles";

const PendingDepositRow = ({
  deposit,
}: PendingDepositRowProps): React.JSX.Element => (
  <div className={PENDING_DEPOSIT_ROW_CLASS}>
    <DepositSummary
      customerName={deposit.reservation.customerName}
      code={deposit.reservation.code}
      amount={deposit.amount}
      currency={deposit.currency}
    />
  </div>
);

export default PendingDepositRow;
