import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import type { StockMovementCard } from "../models/StockMovementCard.interface";
import {
  STOCK_HISTORY_CARD_CLASS,
  STOCK_HISTORY_CARD_HEADING_CLASS,
  STOCK_HISTORY_CHANGES_CLASS,
  STOCK_HISTORY_DATE_CLASS,
  STOCK_HISTORY_REASON_CHIP_CLASS,
  STOCK_HISTORY_TOTAL_CLASS,
} from "../styles/StockHistory.styles";

const StockHistoryCard = ({
  changesText,
  dateText,
  reasonLabel,
  totalText,
}: StockMovementCard): React.JSX.Element => (
  <div
    role={ARIA_ROLE.GROUP}
    aria-label={dateText}
    className={STOCK_HISTORY_CARD_CLASS}
  >
    <div className={STOCK_HISTORY_CARD_HEADING_CLASS}>
      <Text className={STOCK_HISTORY_DATE_CLASS}>
        {dateText}
      </Text>
      <InlineText
        className={STOCK_HISTORY_REASON_CHIP_CLASS}
      >
        {reasonLabel}
      </InlineText>
    </div>
    <Text className={STOCK_HISTORY_TOTAL_CLASS}>
      {totalText}
    </Text>
    {changesText && (
      <Text className={STOCK_HISTORY_CHANGES_CLASS}>
        {changesText}
      </Text>
    )}
  </div>
);

export default StockHistoryCard;
