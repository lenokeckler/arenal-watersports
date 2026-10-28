import { InlineText, Text } from "@/app/components";
import { STRING } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import {
  CURRENCY_NAME,
  PENDING_DEPOSITS_COPY,
} from "../constants/PendingDepositsCopy.constants";
import type { PendingDepositItemProps } from "../models/PendingDepositItemProps.interface";
import {
  DEPOSIT_ITEM_AMOUNT_CLASS,
  DEPOSIT_ITEM_CODE_CLASS,
  DEPOSIT_ITEM_CONTAINER_CLASS,
  DEPOSIT_ITEM_CUSTOMER_CLASS,
  DEPOSIT_ITEM_DETAILS_CLASS,
  DEPOSIT_ITEM_META_CLASS,
  DEPOSIT_ITEM_MONEY_CLASS,
} from "../styles/PendingDepositItem.styles";

const PendingDepositItem = ({
  deposit,
}: PendingDepositItemProps): React.JSX.Element => (
  <div className={DEPOSIT_ITEM_CONTAINER_CLASS}>
    <div className={DEPOSIT_ITEM_DETAILS_CLASS}>
      <Text className={DEPOSIT_ITEM_CUSTOMER_CLASS}>
        {deposit.reservation.customerName}
      </Text>
      <Text>
        <InlineText className={DEPOSIT_ITEM_META_CLASS}>
          {PENDING_DEPOSITS_COPY.RESERVATION_CODE_LABEL}
          {STRING.SPACE}
        </InlineText>
        <InlineText className={DEPOSIT_ITEM_CODE_CLASS}>
          {deposit.reservation.code}
        </InlineText>
      </Text>
    </div>
    <div className={DEPOSIT_ITEM_MONEY_CLASS}>
      <Text className={DEPOSIT_ITEM_AMOUNT_CLASS}>
        {formatMoney({
          amount: deposit.amount,
          currency: deposit.currency,
        })}
      </Text>
      <Text className={DEPOSIT_ITEM_META_CLASS}>
        {CURRENCY_NAME[deposit.currency]}
      </Text>
    </div>
  </div>
);

export default PendingDepositItem;
