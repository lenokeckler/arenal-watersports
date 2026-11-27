import type { DepositResolutionSummaryRowProps } from "../models/DepositResolutionSummaryRowProps.interface";
import {
  DEPOSIT_RESOLUTION_DEFINITION_CLASS,
  DEPOSIT_RESOLUTION_TERM_CLASS,
} from "../styles/DepositResolution.styles";

const DepositResolutionSummaryRow = ({
  label,
  value,
}: DepositResolutionSummaryRowProps): React.JSX.Element => (
  <div>
    <dt className={DEPOSIT_RESOLUTION_TERM_CLASS}>
      {label}
    </dt>
    <dd className={DEPOSIT_RESOLUTION_DEFINITION_CLASS}>
      {value}
    </dd>
  </div>
);

export default DepositResolutionSummaryRow;
