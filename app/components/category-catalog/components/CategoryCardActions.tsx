import type { NullableRef } from "@/app/types";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import type { CategoryCardActionsProps } from "../models/CategoryCardActionsProps.interface";
import CategoryCardConfirmDeleteActions from "./CategoryCardConfirmDeleteActions";
import CategoryCardDeleteButton from "./CategoryCardDeleteButton";
import CategoryCardMarkInactiveButton from "./CategoryCardMarkInactiveButton";

const CategoryCardActions = ({
  actionState,
  isActionLoading,
  onCancelClick,
  onConfirmDeleteClick,
  onDeleteClick,
  onMarkInactiveClick,
}: CategoryCardActionsProps): NullableRef<React.JSX.Element> => {
  if (actionState === CATEGORY_CARD_ACTION_STATE.DELETE) {
    return (
      <CategoryCardDeleteButton
        isLoading={isActionLoading}
        onClick={onDeleteClick}
      />
    );
  }

  if (
    actionState === CATEGORY_CARD_ACTION_STATE.MARK_INACTIVE
  ) {
    return (
      <CategoryCardMarkInactiveButton
        isLoading={isActionLoading}
        onClick={onMarkInactiveClick}
      />
    );
  }

  if (
    actionState ===
    CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE
  ) {
    return (
      <CategoryCardConfirmDeleteActions
        isActionLoading={isActionLoading}
        onCancelClick={onCancelClick}
        onConfirmDeleteClick={onConfirmDeleteClick}
      />
    );
  }

  return null;
};

export default CategoryCardActions;
