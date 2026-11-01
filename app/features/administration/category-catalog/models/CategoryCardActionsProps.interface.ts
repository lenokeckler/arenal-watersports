import type { CategoryCardActionState } from "./CategoryCardActionState.type";

export interface CategoryCardActionsProps {
  actionState: CategoryCardActionState;
  isActionLoading: boolean;
  onCancelClick: () => void;
  onConfirmDeleteClick: () => void;
  onDeleteClick: () => void;
  onMarkInactiveClick: () => void;
}
