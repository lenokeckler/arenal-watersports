import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { PRICE_LOOKUP_COPY } from "../constants/PriceLookupCopy.constants";
import type { PriceLookupRowItemProps } from "../models/PriceLookupRowItemProps.interface";
import {
  PRICE_LOOKUP_AMOUNT_CURRENCY_CLASS,
  PRICE_LOOKUP_AMOUNT_LINE_CLASS,
  PRICE_LOOKUP_AMOUNT_VALUE_CLASS,
  PRICE_LOOKUP_NO_TARIFF_CLASS,
  PRICE_LOOKUP_ROW_CLASS,
  PRICE_LOOKUP_ROW_DETAIL_CLASS,
  PRICE_LOOKUP_ROW_LABEL_CLASS,
} from "../styles/PriceLookup.styles";
import type { JSX } from "react";

const PriceLookupRowItem = ({
  row,
}: PriceLookupRowItemProps): JSX.Element => (
  <div className={PRICE_LOOKUP_ROW_CLASS}>
    <Text className={PRICE_LOOKUP_ROW_LABEL_CLASS}>
      {row.label}
    </Text>
    {row.detail && (
      <Text className={PRICE_LOOKUP_ROW_DETAIL_CLASS}>
        {row.detail}
      </Text>
    )}
    {row.amounts.length === 0 && (
      <Text className={PRICE_LOOKUP_NO_TARIFF_CLASS}>
        {PRICE_LOOKUP_COPY.NO_TARIFF}
      </Text>
    )}
    {row.amounts.map((line) => (
      <div
        key={line.currencyName}
        className={PRICE_LOOKUP_AMOUNT_LINE_CLASS}
      >
        <InlineText
          className={PRICE_LOOKUP_AMOUNT_CURRENCY_CLASS}
        >
          {line.currencyName}
        </InlineText>
        <InlineText
          className={PRICE_LOOKUP_AMOUNT_VALUE_CLASS}
        >
          {line.text}
        </InlineText>
      </div>
    ))}
  </div>
);

export default PriceLookupRowItem;
