import type { TariffListFilter } from "./TariffListFilter.type";

export interface TariffListFilterOption {
  filter: TariffListFilter;
  isSelected: boolean;
  label: string;
}
