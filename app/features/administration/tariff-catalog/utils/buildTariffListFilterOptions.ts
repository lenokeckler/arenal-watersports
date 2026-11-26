import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import { TARIFF_LIST_FILTER } from "../constants/TariffListFilter.constants";
import type { TariffCardViewModel } from "../models/TariffCardViewModel.interface";
import type { TariffListFilter } from "../models/TariffListFilter.type";
import type { TariffListFilterOption } from "../models/TariffListFilterOption.interface";

const formatFilterLabel = (
  label: string,
  count: number
): string =>
  `${label}${TARIFF_CATALOG_COPY.AMOUNT_SEPARATOR}${count}`;

export const buildTariffListFilterOptions = (
  cards: readonly TariffCardViewModel[],
  selected: TariffListFilter
): readonly TariffListFilterOption[] => [
  {
    filter: TARIFF_LIST_FILTER.ALL,
    isSelected: selected === TARIFF_LIST_FILTER.ALL,
    label: formatFilterLabel(
      TARIFF_CATALOG_COPY.FILTER_ALL,
      cards.length
    ),
  },
  {
    filter: TARIFF_LIST_FILTER.MISSING,
    isSelected: selected === TARIFF_LIST_FILTER.MISSING,
    label: formatFilterLabel(
      TARIFF_CATALOG_COPY.FILTER_MISSING,
      cards.filter(
        ({ hasMissingTariff }) => hasMissingTariff
      ).length
    ),
  },
];
