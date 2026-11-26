import type { TariffCardViewModel } from "./TariffCardViewModel.interface";
import type { TariffListFilter } from "./TariffListFilter.type";
import type { TariffListFilterOption } from "./TariffListFilterOption.interface";

export interface TariffListViewModel {
  cards: TariffCardViewModel[];
  emptyMessage: string;
  filterOptions: readonly TariffListFilterOption[];
  onFilterSelect: (filter: TariffListFilter) => void;
  onRetry: () => void;
}
