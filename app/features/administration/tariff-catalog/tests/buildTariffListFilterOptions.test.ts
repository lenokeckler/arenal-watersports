import { describe, expect, it } from "vitest";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import { TARIFF_LIST_FILTER } from "../constants/TariffListFilter.constants";
import { buildTariffCardViewModel } from "../utils/buildTariffCardViewModel";
import { buildTariffListFilterOptions } from "../utils/buildTariffListFilterOptions";
import { filterTariffCards } from "../utils/filterTariffCards";
import {
  buildCatalogRow,
  DEFAULT_CATALOG_ROW,
} from "./TariffCatalog.constants";

const COMPLETE_CARD = buildTariffCardViewModel(
  DEFAULT_CATALOG_ROW
);
const MISSING_CARD = buildTariffCardViewModel(
  buildCatalogRow({ tour: null })
);
const CARDS = [COMPLETE_CARD, MISSING_CARD];
const ALL_COUNT = CARDS.length;
const MISSING_COUNT = 1;

describe("buildTariffListFilterOptions", () => {
  it("counts every category and the ones missing a tariff", () => {
    expect(
      buildTariffListFilterOptions(
        CARDS,
        TARIFF_LIST_FILTER.ALL
      )
    ).toEqual([
      {
        filter: TARIFF_LIST_FILTER.ALL,
        isSelected: true,
        label: `${TARIFF_CATALOG_COPY.FILTER_ALL}${TARIFF_CATALOG_COPY.AMOUNT_SEPARATOR}${ALL_COUNT}`,
      },
      {
        filter: TARIFF_LIST_FILTER.MISSING,
        isSelected: false,
        label: `${TARIFF_CATALOG_COPY.FILTER_MISSING}${TARIFF_CATALOG_COPY.AMOUNT_SEPARATOR}${MISSING_COUNT}`,
      },
    ]);
  });
});

describe("filterTariffCards", () => {
  it("keeps every card for the all filter", () => {
    expect(
      filterTariffCards(CARDS, TARIFF_LIST_FILTER.ALL)
    ).toEqual(CARDS);
  });

  it("keeps only the cards missing a tariff for the missing filter", () => {
    expect(
      filterTariffCards(CARDS, TARIFF_LIST_FILTER.MISSING)
    ).toEqual([MISSING_CARD]);
  });
});
