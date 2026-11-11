import type { NullableUndefined } from "@/app/types";
import type { UnitCategory } from "./UnitCategory.interface";
import type { UnitListItem } from "./UnitListItem.interface";

export interface UnitListViewProps {
  category: UnitCategory;
  currentPage: number;
  fetchError?: NullableUndefined<Error>;
  fetchFailed: boolean;
  pageCount: number;
  units: UnitListItem[];
}
