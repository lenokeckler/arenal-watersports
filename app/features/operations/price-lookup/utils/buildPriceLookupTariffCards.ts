import {
  PRICE_LOOKUP_TARIFF_LABEL,
  PRICE_LOOKUP_TARIFF_TYPE_ORDER,
} from "../constants/PriceLookupTariffLabel.constants";
import type { PriceLookupRow } from "../models/PriceLookupRow.interface";
import type { PriceLookupTariff } from "../models/PriceLookupTariff.interface";
import type { PriceLookupTariffCard } from "../models/PriceLookupTariffCard.interface";
import type { PriceLookupTariffType } from "../models/PriceLookupTariffType.type";
import { buildPriceLookupAmountLines } from "./buildPriceLookupAmountLines";

const buildTariffRow = (
  tariff: PriceLookupTariff,
  type: PriceLookupTariffType
): PriceLookupRow => {
  const amounts = tariff[type];
  return {
    amounts: amounts
      ? buildPriceLookupAmountLines(amounts)
      : [],
    detail: null,
    id: `${tariff.categoryId}-${type}`,
    label: PRICE_LOOKUP_TARIFF_LABEL[type],
  };
};

export const buildPriceLookupTariffCards = (
  tariffs: PriceLookupTariff[]
): PriceLookupTariffCard[] =>
  tariffs
    .filter((tariff) => tariff.rental || tariff.tour)
    .map((tariff) => ({
      id: tariff.categoryId,
      rows: PRICE_LOOKUP_TARIFF_TYPE_ORDER.map((type) =>
        buildTariffRow(tariff, type)
      ),
      title: tariff.categoryName,
    }));
