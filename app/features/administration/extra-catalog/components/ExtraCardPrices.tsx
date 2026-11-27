import { Fragment } from "react";
import InlineText from "@/app/components/text/InlineText";
import type { NullableRef } from "@/app/types";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import type { ExtraCardPricesProps } from "../models/ExtraCardPricesProps.interface";
import { EXTRA_CARD_PRICE_CLASS } from "../styles/ExtraCard.styles";

const ExtraCardPrices = ({
  prices,
}: ExtraCardPricesProps): NullableRef<React.JSX.Element> =>
  prices.length > 0 ? (
    <InlineText className={EXTRA_CARD_PRICE_CLASS}>
      {prices.map((price, index) => (
        <Fragment key={price}>
          {index > 0
            ? EXTRA_CATALOG_COPY.PRICE_SEPARATOR
            : null}
          <InlineText>{price}</InlineText>
        </Fragment>
      ))}
    </InlineText>
  ) : null;

export default ExtraCardPrices;
