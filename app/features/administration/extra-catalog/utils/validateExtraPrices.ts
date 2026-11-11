import { CURRENCY_CODE } from "@/app/constants";
import { EXTRA_PRICE_INPUT_FIELD } from "../constants/ExtraInputField.constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";
import type { ExtraPriceErrors } from "../models/ExtraPriceErrors.interface";
import { isExtraPriceBlank } from "./isExtraPriceBlank";
import { readExtraInputField } from "./readExtraInputField";
import { validateExtraPriceText } from "./validateExtraPriceText";

export const validateExtraPrices = (
  input: unknown
): ExtraPriceErrors => {
  const priceUsdText = readExtraInputField(
    input,
    EXTRA_PRICE_INPUT_FIELD[CURRENCY_CODE.USD]
  );
  const priceCrcText = readExtraInputField(
    input,
    EXTRA_PRICE_INPUT_FIELD[CURRENCY_CODE.CRC]
  );
  const priceUsdError = validateExtraPriceText(
    priceUsdText,
    CURRENCY_CODE.USD
  );
  const priceCrcError = validateExtraPriceText(
    priceCrcText,
    CURRENCY_CODE.CRC
  );
  const hasNoPrice =
    isExtraPriceBlank(priceUsdText) &&
    isExtraPriceBlank(priceCrcText);

  return {
    ...(priceUsdError ? { priceUsd: priceUsdError } : {}),
    ...(priceCrcError ? { priceCrc: priceCrcError } : {}),
    ...(hasNoPrice && {
      prices: EXTRA_CATALOG_COPY.PRICES_REQUIRED_ERROR,
    }),
  };
};
