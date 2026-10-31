import { UnorderedList } from "@/app/components";
import { UNORDERED_LIST } from "@/app/constants";
import { DAILY_INCOME_ID } from "../constants/DailyIncome.constants";
import { DAILY_INCOME_METHOD_LIST_COPY } from "../constants/DailyIncomeCopy.constants";
import type { CurrencyIncomeProps } from "../models/CurrencyIncomeProps.interface";
import { computeBarPercent } from "../utils/computeBarPercent";
import DailyIncomeBarRow from "./DailyIncomeBarRow";

const DailyIncomeChart = ({
  income,
}: CurrencyIncomeProps): React.JSX.Element => {
  const largestAmount = Math.max(
    ...income.byPaymentMethod.map(({ amount }) => amount)
  );

  return (
    <UnorderedList
      variant={UNORDERED_LIST.VARIANTS.PLAIN}
      ariaLabel={
        DAILY_INCOME_METHOD_LIST_COPY[income.currency]
      }
      items={income.byPaymentMethod.map((method) => ({
        id: `${DAILY_INCOME_ID.METHOD_PREFIX}${method.key}`,
        text: (
          <DailyIncomeBarRow
            method={method}
            currency={income.currency}
            percent={computeBarPercent(
              method.amount,
              largestAmount
            )}
          />
        ),
      }))}
    />
  );
};

export default DailyIncomeChart;
