import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import { resolveCategoryCardContainerClassName } from "../styles/CategoryCard.styles";
import CategoryCardActions from "./CategoryCardActions";
import CategoryCardGroupRow from "./CategoryCardGroupRow";
import CategoryCardNameRow from "./CategoryCardNameRow";
import CategoryCardTrackingMode from "./CategoryCardTrackingMode";

const CategoryCard = ({
  category,
  isInactive,
  trackingModeLabel,
  actionState,
  isActionLoading,
  onCancelClick,
  onConfirmDeleteClick,
  onDeleteClick,
  onMarkInactiveClick,
}: CategoryCardViewModel): React.JSX.Element => (
  <div
    className={resolveCategoryCardContainerClassName(
      isInactive,
      actionState ===
        CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE
    )}
  >
    <CategoryCardNameRow
      name={category.name}
      isInactive={isInactive}
    />
    <CategoryCardTrackingMode label={trackingModeLabel} />
    {category.groupName && (
      <CategoryCardGroupRow
        groupName={category.groupName}
      />
    )}
    <CategoryCardActions
      actionState={actionState}
      isActionLoading={isActionLoading}
      onCancelClick={onCancelClick}
      onConfirmDeleteClick={onConfirmDeleteClick}
      onDeleteClick={onDeleteClick}
      onMarkInactiveClick={onMarkInactiveClick}
    />
  </div>
);

export default CategoryCard;
