import { InlineText } from "@/app/components";
import { SCREEN_READER_ONLY_CLASS } from "@/app/styles/ScreenReader.styles";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { INCOME_SIGN_GLYPH } from "../constants/Income.constants";
import { INCOME_COPY } from "../constants/IncomeCopy.constants";
import type { IncomeSignedAmountProps } from "../models/IncomeSignedAmountProps.interface";
import { INCOME_SIGN_CLASS } from "../styles/IncomeCurrency.styles";

const IncomeSignedAmount = ({
  money,
  hasSignGlyph = false,
  isSpokenNegative = false,
}: IncomeSignedAmountProps): React.JSX.Element => (
  <>
    {hasSignGlyph && (
      <InlineText
        aria-hidden
        className={INCOME_SIGN_CLASS}
      >
        {INCOME_SIGN_GLYPH}
      </InlineText>
    )}
    {isSpokenNegative && (
      <InlineText className={SCREEN_READER_ONLY_CLASS}>
        {INCOME_COPY.NEGATIVE_SCREEN_READER_PREFIX}
      </InlineText>
    )}
    {formatMoney(money)}
  </>
);

export default IncomeSignedAmount;
