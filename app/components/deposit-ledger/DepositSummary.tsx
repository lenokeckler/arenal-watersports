import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import {
  CURRENCY_NAME_COPY,
  DEPOSIT_COPY,
  STRING,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import type { DepositSummaryProps } from "./models/DepositSummaryProps.interface";
import {
  DEPOSIT_SUMMARY_AMOUNT_CLASS,
  DEPOSIT_SUMMARY_CLASS,
  DEPOSIT_SUMMARY_CODE_CLASS,
  DEPOSIT_SUMMARY_CUSTOMER_CLASS,
  DEPOSIT_SUMMARY_DETAILS_CLASS,
  DEPOSIT_SUMMARY_META_CLASS,
  DEPOSIT_SUMMARY_MONEY_CLASS,
} from "./styles/DepositSummary.styles";

const DepositSummary = ({
  customerName,
  code,
  amount,
  currency,
}: DepositSummaryProps): React.JSX.Element => (
  <div className={DEPOSIT_SUMMARY_CLASS}>
    <div className={DEPOSIT_SUMMARY_DETAILS_CLASS}>
      <Text className={DEPOSIT_SUMMARY_CUSTOMER_CLASS}>
        {customerName}
      </Text>
      <Text>
        <InlineText className={DEPOSIT_SUMMARY_META_CLASS}>
          {DEPOSIT_COPY.RESERVATION_CODE_LABEL}
          {STRING.SPACE}
        </InlineText>
        <InlineText className={DEPOSIT_SUMMARY_CODE_CLASS}>
          {code}
        </InlineText>
      </Text>
    </div>
    <div className={DEPOSIT_SUMMARY_MONEY_CLASS}>
      <Text className={DEPOSIT_SUMMARY_AMOUNT_CLASS}>
        {formatMoney({ amount, currency })}
      </Text>
      <Text className={DEPOSIT_SUMMARY_META_CLASS}>
        {CURRENCY_NAME_COPY[currency]}
      </Text>
    </div>
  </div>
);

export default DepositSummary;
