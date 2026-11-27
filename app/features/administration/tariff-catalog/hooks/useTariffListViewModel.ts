"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TARIFF_CATALOG_COPY } from "../constants/TariffCatalogCopy.constants";
import { TARIFF_LIST_FILTER } from "../constants/TariffListFilter.constants";
import type { TariffListFilter } from "../models/TariffListFilter.type";
import type { TariffListViewModel } from "../models/TariffListViewModel.interface";
import type { TariffListViewModelProps } from "../models/TariffListViewModelProps.interface";
import { buildTariffCardViewModel } from "../utils/buildTariffCardViewModel";
import { buildTariffListFilterOptions } from "../utils/buildTariffListFilterOptions";
import { filterTariffCards } from "../utils/filterTariffCards";

export const useTariffListViewModel = ({
  categories,
}: TariffListViewModelProps): TariffListViewModel => {
  const router = useRouter();
  const [filter, setFilter] = useState<TariffListFilter>(
    TARIFF_LIST_FILTER.ALL
  );
  const allCards = categories.map(buildTariffCardViewModel);
  const hasCategories = allCards.length > 0;

  return {
    cards: filterTariffCards(allCards, filter),
    emptyMessage: hasCategories
      ? TARIFF_CATALOG_COPY.FILTER_MISSING_EMPTY
      : TARIFF_CATALOG_COPY.EMPTY_MESSAGE,
    filterOptions: hasCategories
      ? buildTariffListFilterOptions(allCards, filter)
      : [],
    onFilterSelect: setFilter,
    onRetry: () => {
      router.refresh();
    },
  };
};
