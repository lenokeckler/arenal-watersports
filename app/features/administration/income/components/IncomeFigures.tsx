import { INCOME_COPY } from "../constants/IncomeCopy.constants";
import type { IncomeDisplayProps } from "../models/IncomeDisplayProps.interface";
import { INCOME_TALLY_CLASS } from "../styles/IncomeCurrency.styles";
import IncomeFigureRow from "./IncomeFigureRow";
import IncomeNetRow from "./IncomeNetRow";

const IncomeFigures = ({
  display,
}: IncomeDisplayProps): React.JSX.Element => (
  <dl className={INCOME_TALLY_CLASS}>
    <IncomeFigureRow
      label={INCOME_COPY.COLLECTED_LABEL}
      money={display.collected}
    />
    <IncomeFigureRow
      label={INCOME_COPY.REFUNDED_LABEL}
      money={display.refunded}
      hasSignGlyph={display.refunded.amount > 0}
    />
    <IncomeNetRow
      net={display.net}
      isNegative={display.isNetNegative}
    />
  </dl>
);

export default IncomeFigures;
