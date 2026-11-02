import { Category } from "./Category.interface";

export interface CategoryListItem extends Category {
  hasRecords: boolean;
}
