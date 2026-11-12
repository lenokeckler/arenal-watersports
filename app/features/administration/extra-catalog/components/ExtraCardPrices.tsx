import InlineText from "@/app/components/text/InlineText";
import type { NullableRef } from "@/app/types";
import type { ExtraCardPricesProps } from "../models/ExtraCardPricesProps.interface";
import {
  EXTRA_CARD_PRICE_CLASS,
  EXTRA_CARD_PRICES_CLASS,
} from "../styles/ExtraCard.styles";

const ExtraCardPrices = ({
  prices,
}: ExtraCardPricesProps): NullableRef<React.JSX.Element> =>
  prices.length > 0 ? (
    <div className={EXTRA_CARD_PRICES_CLASS}>
      {prices.map((price) => (
        <InlineText
          key={price}
          className={EXTRA_CARD_PRICE_CLASS}
        >
          {price}
        </InlineText>
      ))}
    </div>
  ) : null;

export default ExtraCardPrices;
