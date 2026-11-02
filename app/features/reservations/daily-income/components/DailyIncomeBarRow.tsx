import { Text } from "@/app/components";
import { formatMoney } from "@/app/utils/money/formatMoney";
import type { DailyIncomeBarRowProps } from "../models/DailyIncomeBarRowProps.interface";
import {
  METHOD_BAR_ITEM_CLASS,
  METHOD_BAR_NAME_CLASS,
  METHOD_BAR_ROW_CLASS,
  METHOD_BAR_VALUE_CLASS,
} from "../styles/DailyIncomeBar.styles";
import { resolvePaymentMethodName } from "../utils/resolvePaymentMethodName";
import DailyIncomeBar from "./DailyIncomeBar";

const DailyIncomeBarRow = ({
  method,
  currency,
  percent,
}: DailyIncomeBarRowProps): React.JSX.Element => (
  <div className={METHOD_BAR_ITEM_CLASS}>
    <div className={METHOD_BAR_ROW_CLASS}>
      <Text className={METHOD_BAR_NAME_CLASS}>
        {resolvePaymentMethodName(method)}
      </Text>
      <Text className={METHOD_BAR_VALUE_CLASS}>
        {formatMoney({ amount: method.amount, currency })}
      </Text>
    </div>
    <DailyIncomeBar percent={percent} />
  </div>
);

export default DailyIncomeBarRow;
