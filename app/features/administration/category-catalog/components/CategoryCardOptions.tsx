import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { CategoryCardOptionsProps } from "../models/CategoryCardOptionsProps.interface";
import { CATEGORY_CARD_OPTIONS_CLASS } from "../styles/CategoryCardPanel.styles";
import CategoryCardAlertsLink from "./CategoryCardAlertsLink";
import CategoryCardBehaviorLink from "./CategoryCardBehaviorLink";
import CategoryCardDepositLink from "./CategoryCardDepositLink";
import CategoryCardUnitsLink from "./CategoryCardUnitsLink";

const CategoryCardOptions = ({
  categoryId,
  trackingMode,
}: CategoryCardOptionsProps): React.JSX.Element => (
  <div className={CATEGORY_CARD_OPTIONS_CLASS}>
    <CategoryCardBehaviorLink categoryId={categoryId} />
    <CategoryCardDepositLink categoryId={categoryId} />
    <CategoryCardAlertsLink categoryId={categoryId} />
    {trackingMode === CATEGORY_TRACKING_MODE.BY_UNIT && (
      <CategoryCardUnitsLink categoryId={categoryId} />
    )}
  </div>
);

export default CategoryCardOptions;
