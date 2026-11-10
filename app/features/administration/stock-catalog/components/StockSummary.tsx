import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import type { StockSummaryProps } from "../models/StockSummaryProps.interface";
import {
  STOCK_SUMMARY_BREAKDOWN_CLASS,
  STOCK_SUMMARY_CLASS,
  STOCK_SUMMARY_STAT_CLASS,
  STOCK_SUMMARY_STAT_LABEL_CLASS,
  STOCK_SUMMARY_STAT_VALUE_CLASS,
  STOCK_SUMMARY_TOTAL_CLASS,
  STOCK_SUMMARY_TOTAL_LABEL_CLASS,
  STOCK_SUMMARY_TOTAL_VALUE_CLASS,
} from "../styles/StockSummary.styles";

const StockSummary = ({
  summary,
}: StockSummaryProps): React.JSX.Element => (
  <div className={STOCK_SUMMARY_CLASS}>
    <Text className={STOCK_SUMMARY_TOTAL_CLASS}>
      <InlineText
        className={STOCK_SUMMARY_TOTAL_LABEL_CLASS}
      >
        {STOCK_COUNT_COPY.TOTAL_REGISTERED_LABEL}
      </InlineText>
      <InlineText
        className={STOCK_SUMMARY_TOTAL_VALUE_CLASS}
      >
        {summary.totalText}
      </InlineText>
    </Text>
    <div className={STOCK_SUMMARY_BREAKDOWN_CLASS}>
      <Text className={STOCK_SUMMARY_STAT_CLASS}>
        <InlineText
          className={STOCK_SUMMARY_STAT_LABEL_CLASS}
        >
          {STOCK_COUNT_COPY.AVAILABLE_FOR_USE_LABEL}
        </InlineText>
        <InlineText
          className={STOCK_SUMMARY_STAT_VALUE_CLASS}
        >
          {summary.available}
        </InlineText>
      </Text>
      <Text className={STOCK_SUMMARY_STAT_CLASS}>
        <InlineText
          className={STOCK_SUMMARY_STAT_LABEL_CLASS}
        >
          {STOCK_COUNT_COPY.NEEDS_ATTENTION_LABEL}
        </InlineText>
        <InlineText
          className={STOCK_SUMMARY_STAT_VALUE_CLASS}
        >
          {summary.attention}
        </InlineText>
      </Text>
    </div>
  </div>
);

export default StockSummary;
