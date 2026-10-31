import { CategoryCardActionState } from "./CategoryCardActionState.type";
import { CategoryListItem } from "./CategoryListItem.interface";

export interface CategoryCardViewModel {
  category: CategoryListItem;
  actionState: CategoryCardActionState;
  isActionLoading: boolean;
  onCancelClick: () => void;
  onConfirmDeleteClick: () => void;
  onDeleteClick: () => void;
  onMarkInactiveClick: () => void;
}
