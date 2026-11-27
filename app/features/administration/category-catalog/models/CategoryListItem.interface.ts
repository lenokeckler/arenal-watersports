import { Category } from "./Category.interface";

export interface CategoryListItem extends Category {
  currentQuantity: number;
  hasImage: boolean;
  hasRecords: boolean;
  isReservable: boolean;
}
