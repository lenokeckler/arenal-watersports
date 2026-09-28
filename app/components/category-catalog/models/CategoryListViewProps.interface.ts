import type { CategoryListItem } from "./CategoryListItem.interface";

export interface CategoryListViewProps {
  categories: CategoryListItem[];
  fetchFailed: boolean;
}
