import type { TariffListFilter } from "./TariffListFilter.type";
import type { TariffListFilterOption } from "./TariffListFilterOption.interface";

export interface TariffListFiltersProps {
  options: readonly TariffListFilterOption[];
  onSelect: (filter: TariffListFilter) => void;
}
