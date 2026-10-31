import type { NullableRef } from "@/app/types";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import type { CategoryCardActionsProps } from "../models/CategoryCardActionsProps.interface";
import CategoryCardDeleteButton from "./CategoryCardDeleteButton";
import CategoryCardMarkInactiveButton from "./CategoryCardMarkInactiveButton";

const CategoryCardActions = ({
  actionState,
  isActionLoading,
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

  return null;
};

export default CategoryCardActions;
