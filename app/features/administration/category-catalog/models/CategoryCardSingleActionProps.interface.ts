import type { CategoryCardActionState } from "./CategoryCardActionState.type";

export interface CategoryCardSingleActionProps {
  actionState: CategoryCardActionState;
  isActionLoading: boolean;
  onDeleteClick: () => void;
  onMarkInactiveClick: () => void;
  onReactivateClick: () => void;
}
