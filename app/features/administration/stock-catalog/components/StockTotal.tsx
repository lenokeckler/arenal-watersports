import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import type { StockTotalProps } from "../models/StockTotalProps.interface";
import {
  STOCK_COUNT_TOTAL_CLASS,
  STOCK_COUNT_TOTAL_LABEL_CLASS,
  STOCK_COUNT_TOTAL_VALUE_CLASS,
} from "../styles/StockCount.styles";

const StockTotal = ({
  total,
}: StockTotalProps): React.JSX.Element => (
  <Text className={STOCK_COUNT_TOTAL_CLASS}>
    <InlineText className={STOCK_COUNT_TOTAL_LABEL_CLASS}>
      {STOCK_COUNT_COPY.TOTAL_LABEL}
    </InlineText>
    <InlineText className={STOCK_COUNT_TOTAL_VALUE_CLASS}>
      {total}
    </InlineText>
  </Text>
);

export default StockTotal;
