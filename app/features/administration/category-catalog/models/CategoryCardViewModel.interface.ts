import { CategoryListItem } from "./CategoryListItem.interface";

export interface CategoryCardViewModel {
  category: CategoryListItem;
  isInactive: boolean;
  subtitle: string;
}
