import type { CategoryCardActionState } from "./CategoryCardActionState.type";

export interface CategoryCardActionsProps {
  actionState: CategoryCardActionState;
  isActionLoading: boolean;
  onDeleteClick: () => void;
  onMarkInactiveClick: () => void;
}
