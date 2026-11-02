import type { NullableRef } from "@/app/types";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import type { CategoryCardActionsProps } from "../models/CategoryCardActionsProps.interface";
import CategoryCardConfirmDeleteActions from "./CategoryCardConfirmDeleteActions";
import CategoryCardSingleAction from "./CategoryCardSingleAction";

const CategoryCardActions = ({
  onCancelClick,
  onConfirmDeleteClick,
  ...singleActionProps
}: CategoryCardActionsProps): NullableRef<React.JSX.Element> =>
  singleActionProps.actionState ===
  CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE ? (
    <CategoryCardConfirmDeleteActions
      isActionLoading={singleActionProps.isActionLoading}
      onCancelClick={onCancelClick}
      onConfirmDeleteClick={onConfirmDeleteClick}
    />
  ) : (
    <CategoryCardSingleAction {...singleActionProps} />
  );

export default CategoryCardActions;
