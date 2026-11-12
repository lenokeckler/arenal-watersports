import type { IncomeFigureRowProps } from "../models/IncomeFigureRowProps.interface";
import {
  INCOME_TALLY_AMOUNT_CLASS,
  INCOME_TALLY_LABEL_CLASS,
  INCOME_TALLY_ROW_CLASS,
} from "../styles/IncomeCurrency.styles";
import IncomeSignedAmount from "./IncomeSignedAmount";

const IncomeFigureRow = ({
  label,
  money,
  hasSignGlyph = false,
}: IncomeFigureRowProps): React.JSX.Element => (
  <div className={INCOME_TALLY_ROW_CLASS}>
    <dt className={INCOME_TALLY_LABEL_CLASS}>{label}</dt>
    <dd className={INCOME_TALLY_AMOUNT_CLASS}>
      <IncomeSignedAmount
        money={money}
        hasSignGlyph={hasSignGlyph}
      />
    </dd>
  </div>
);

export default IncomeFigureRow;
