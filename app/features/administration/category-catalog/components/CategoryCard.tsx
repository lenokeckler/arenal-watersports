import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import {
  CATEGORY_CARD_BUTTONS_CLASS,
  resolveCategoryCardContainerClassName,
} from "../styles/CategoryCard.styles";
import CategoryCardActions from "./CategoryCardActions";
import CategoryCardAlertsLink from "./CategoryCardAlertsLink";
import CategoryCardBehaviorLink from "./CategoryCardBehaviorLink";
import CategoryCardDepositLink from "./CategoryCardDepositLink";
import CategoryCardGroupRow from "./CategoryCardGroupRow";
import CategoryCardNameRow from "./CategoryCardNameRow";
import CategoryCardTrackingMode from "./CategoryCardTrackingMode";
import CategoryCardUnitsLink from "./CategoryCardUnitsLink";

const CategoryCard = ({
  category,
  isInactive,
  trackingModeLabel,
  ...actionProps
}: CategoryCardViewModel): React.JSX.Element => (
  <div
    className={resolveCategoryCardContainerClassName(
      isInactive,
      actionProps.actionState ===
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
      <CategoryCardAlertsLink categoryId={category.id} />
      {category.trackingMode ===
        CATEGORY_TRACKING_MODE.BY_UNIT && (
        <CategoryCardUnitsLink categoryId={category.id} />
      )}
      <CategoryCardActions {...actionProps} />
    </div>
  </div>
);

export default CategoryCard;
