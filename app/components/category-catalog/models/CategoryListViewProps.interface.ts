import type { NullableUndefined } from "@/app/types";
import type { CategoryListItem } from "./CategoryListItem.interface";

export interface CategoryListViewProps {
  categories: CategoryListItem[];
  fetchError?: NullableUndefined<Error>;
  fetchFailed: boolean;
}
