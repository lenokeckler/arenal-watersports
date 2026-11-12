import { Category } from "./Category.interface";

export interface CategoryListItem extends Category {
  currentQuantity: number;
  hasRecords: boolean;
}
