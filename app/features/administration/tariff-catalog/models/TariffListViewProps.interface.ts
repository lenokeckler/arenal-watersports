import type { TariffCatalogRow } from "./TariffCatalogRow.interface";

export interface TariffListViewProps {
  categories: TariffCatalogRow[];
  fetchFailed: boolean;
}
