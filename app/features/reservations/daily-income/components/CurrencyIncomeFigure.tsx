import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { DAILY_INCOME_COPY } from "../constants/DailyIncomeCopy.constants";
import type { CurrencyIncomeProps } from "../models/CurrencyIncomeProps.interface";
import {
  CURRENCY_INCOME_AMOUNT_CLASS,
  CURRENCY_INCOME_BREAKDOWN_CLASS,
  CURRENCY_INCOME_FIGURE_CLASS,
  CURRENCY_INCOME_LABEL_CLASS,
} from "../styles/DailyIncomeCurrency.styles";
import { buildCurrencyIncomeIds } from "../utils/buildCurrencyIncomeIds";
import DailyIncomeChart from "./DailyIncomeChart";

const CurrencyIncomeFigure = ({
  income,
}: CurrencyIncomeProps): React.JSX.Element => (
  <>
    <div className={CURRENCY_INCOME_FIGURE_CLASS}>
      <Text className={CURRENCY_INCOME_LABEL_CLASS}>
        {DAILY_INCOME_COPY.INCOME_LABEL}
      </Text>
      <Text className={CURRENCY_INCOME_AMOUNT_CLASS}>
        {formatMoney({
          amount: income.total,
          currency: income.currency,
        })}
      </Text>
    </div>
    <div className={CURRENCY_INCOME_BREAKDOWN_CLASS}>
      <Title
        variant={TitleVariant.AUXILIAR}
        text={DAILY_INCOME_COPY.BREAKDOWN_TITLE}
        id={
          buildCurrencyIncomeIds(income.currency).breakdown
        }
        className={CURRENCY_INCOME_LABEL_CLASS}
      />
      <DailyIncomeChart income={income} />
    </div>
  </>
);

export default CurrencyIncomeFigure;
