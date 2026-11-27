import { PRICE_LOOKUP_COPY } from "../constants/PriceLookupCopy.constants";
import type { PriceLookupComboItem } from "../models/PriceLookupComboItem.interface";

export const formatPriceLookupComboItems = (
  items: PriceLookupComboItem[]
): string =>
  items
    .map(
      ({ categoryName, quantity }) =>
        `${quantity}${PRICE_LOOKUP_COPY.ITEM_QUANTITY_SEPARATOR}${categoryName}`
    )
    .join(PRICE_LOOKUP_COPY.ITEM_SEPARATOR);
