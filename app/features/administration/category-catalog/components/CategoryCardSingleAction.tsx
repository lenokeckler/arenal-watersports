import type { NullableRef } from "@/app/types";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import type { CategoryCardSingleActionProps } from "../models/CategoryCardSingleActionProps.interface";
import CategoryCardDeleteButton from "./CategoryCardDeleteButton";
import CategoryCardMarkInactiveButton from "./CategoryCardMarkInactiveButton";
import CategoryCardReactivateButton from "./CategoryCardReactivateButton";

const CategoryCardSingleAction = ({
  actionState,
  isActionLoading,
  onDeleteClick,
  onMarkInactiveClick,
  onReactivateClick,
}: CategoryCardSingleActionProps): NullableRef<React.JSX.Element> => {
  const actionByState = {
    [CATEGORY_CARD_ACTION_STATE.DELETE]: (
      <CategoryCardDeleteButton
        isLoading={isActionLoading}
        onClick={onDeleteClick}
      />
    ),
    [CATEGORY_CARD_ACTION_STATE.MARK_INACTIVE]: (
      <CategoryCardMarkInactiveButton
        isLoading={isActionLoading}
        onClick={onMarkInactiveClick}
      />
    ),
    [CATEGORY_CARD_ACTION_STATE.REACTIVATE]: (
      <CategoryCardReactivateButton
        isLoading={isActionLoading}
        onClick={onReactivateClick}
      />
    ),
  };

  return (
    actionByState[
      actionState as keyof typeof actionByState
    ] ?? null
  );
};

export default CategoryCardSingleAction;
