import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import {
  CATEGORY_CARD_BUTTONS_CLASS,
  resolveCategoryCardContainerClassName,
} from "../styles/CategoryCard.styles";
import CategoryCardActions from "./CategoryCardActions";
import CategoryCardBehaviorLink from "./CategoryCardBehaviorLink";
import CategoryCardDepositLink from "./CategoryCardDepositLink";
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
    <div className={CATEGORY_CARD_BUTTONS_CLASS}>
      <CategoryCardBehaviorLink categoryId={category.id} />
      <CategoryCardDepositLink categoryId={category.id} />
      <CategoryCardActions
        actionState={actionState}
        isActionLoading={isActionLoading}
        onCancelClick={onCancelClick}
        onConfirmDeleteClick={onConfirmDeleteClick}
        onDeleteClick={onDeleteClick}
        onMarkInactiveClick={onMarkInactiveClick}
      />
    </div>
  </div>
);

export default CategoryCard;
