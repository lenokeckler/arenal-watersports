import type { NullableUndefined } from "@/app/types";
import type { CategoryListItem } from "./CategoryListItem.interface";

export interface CategoryListViewProps {
  categories: CategoryListItem[];
  currentPage: number;
  fetchError?: NullableUndefined<Error>;
  fetchFailed: boolean;
  pageCount: number;
}
