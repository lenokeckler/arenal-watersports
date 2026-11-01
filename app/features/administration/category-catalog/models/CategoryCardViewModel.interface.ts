import { CategoryCardActionState } from "./CategoryCardActionState.type";
import { CategoryListItem } from "./CategoryListItem.interface";

export interface CategoryCardViewModel {
  category: CategoryListItem;
  isInactive: boolean;
  trackingModeLabel: string;
  actionState: CategoryCardActionState;
  isActionLoading: boolean;
  onCancelClick: () => void;
  onConfirmDeleteClick: () => void;
  onDeleteClick: () => void;
  onMarkInactiveClick: () => void;
}
