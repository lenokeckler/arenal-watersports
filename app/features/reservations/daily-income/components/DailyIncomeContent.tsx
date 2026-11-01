import type { DailyIncomeContentProps } from "../models/DailyIncomeContentProps.interface";
import { DAILY_INCOME_SECTIONS_CLASS } from "../styles/DailyIncome.styles";
import { hasAnyIncome } from "../utils/hasAnyIncome";
import CurrencyIncomeSection from "./CurrencyIncomeSection";
import DailyIncomeEmpty from "./DailyIncomeEmpty";
import DailyIncomeHeader from "./DailyIncomeHeader";

const DailyIncomeContent = ({
  income,
}: DailyIncomeContentProps): React.JSX.Element => (
  <>
    <DailyIncomeHeader date={income.date} />
    {hasAnyIncome(income) ? (
      <div className={DAILY_INCOME_SECTIONS_CLASS}>
        {income.currencies.map((currencyIncome) => (
          <CurrencyIncomeSection
            key={currencyIncome.currency}
            income={currencyIncome}
          />
        ))}
      </div>
    ) : (
      <DailyIncomeEmpty />
    )}
  </>
);

export default DailyIncomeContent;
