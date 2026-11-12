import { INCOME_COPY } from "../constants/IncomeCopy.constants";
import type { IncomeNetRowProps } from "../models/IncomeNetRowProps.interface";
import {
  INCOME_NET_BLOCK_CLASS,
  INCOME_NET_HELP_CLASS,
  INCOME_NET_LABEL_CLASS,
  resolveIncomeNetAmountClassName,
} from "../styles/IncomeCurrency.styles";
import IncomeNetNote from "./IncomeNetNote";
import IncomeSignedAmount from "./IncomeSignedAmount";

const IncomeNetRow = ({
  net,
  isNegative,
}: IncomeNetRowProps): React.JSX.Element => (
  <div className={INCOME_NET_BLOCK_CLASS}>
    <dt className={INCOME_NET_LABEL_CLASS}>
      {INCOME_COPY.NET_LABEL}
    </dt>
    <dd
      className={resolveIncomeNetAmountClassName(
        isNegative
      )}
    >
      <IncomeSignedAmount
        money={net}
        hasSignGlyph={isNegative}
        isSpokenNegative={isNegative}
      />
    </dd>
    <dd className={INCOME_NET_HELP_CLASS}>
      {INCOME_COPY.NET_HELP}
    </dd>
    {isNegative && <IncomeNetNote />}
  </div>
);

export default IncomeNetRow;
