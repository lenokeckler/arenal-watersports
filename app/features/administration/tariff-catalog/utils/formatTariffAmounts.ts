import { CURRENCY_ORDER } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import { TARIFF_CURRENCY_AMOUNT_FIELD } from "../constants/TariffCurrencyAmountField.constants";
import type { TariffAmounts } from "../models/TariffAmounts.interface";

const formatPresentAmounts = (
  amounts: TariffAmounts
): string[] =>
  CURRENCY_ORDER.flatMap((currency) => {
    const amount =
      amounts[TARIFF_CURRENCY_AMOUNT_FIELD[currency]];
    return amount === null
      ? []
      : [formatMoney({ amount, currency })];
  });

export const formatTariffAmounts = (
  amounts: NullableRef<TariffAmounts>
): string => {
  const formattedAmounts = amounts
    ? formatPresentAmounts(amounts)
    : [];
  return formattedAmounts.length === 0
    ? TARIFF_CATALOG_COPY.NO_TARIFF
    : formattedAmounts.join(
        TARIFF_CATALOG_COPY.AMOUNT_SEPARATOR
      );
};
