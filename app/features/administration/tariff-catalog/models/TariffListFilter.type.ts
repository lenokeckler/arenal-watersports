import type { TARIFF_LIST_FILTER } from "../constants/TariffListFilter.constants";

export type TariffListFilter =
  (typeof TARIFF_LIST_FILTER)[keyof typeof TARIFF_LIST_FILTER];
