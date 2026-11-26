import { TARIFF_LIST_FILTER } from "../constants/TariffListFilter.constants";
import type { TariffCardViewModel } from "../models/TariffCardViewModel.interface";
import type { TariffListFilter } from "../models/TariffListFilter.type";

export const filterTariffCards = (
  cards: TariffCardViewModel[],
  filter: TariffListFilter
): TariffCardViewModel[] =>
  filter === TARIFF_LIST_FILTER.MISSING
    ? cards.filter(
        ({ hasMissingTariff }) => hasMissingTariff
      )
    : cards;
