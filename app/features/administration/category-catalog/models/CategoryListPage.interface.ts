import type { CategoryListItem } from "./CategoryListItem.interface";

export interface CategoryListPage {
  categories: CategoryListItem[];
  pageCount: number;
  totalCount: number;
}
