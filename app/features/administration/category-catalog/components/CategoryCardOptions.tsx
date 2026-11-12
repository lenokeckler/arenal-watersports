import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import type { CategoryCardOptionsProps } from "../models/CategoryCardOptionsProps.interface";
import { CATEGORY_CARD_OPTIONS_CLASS } from "../styles/CategoryCardPanel.styles";
import CategoryCardAlertsLink from "./CategoryCardAlertsLink";
import CategoryCardBehaviorLink from "./CategoryCardBehaviorLink";
import CategoryCardDepositLink from "./CategoryCardDepositLink";
import CategoryCardImageLink from "./CategoryCardImageLink";
import CategoryCardStockLink from "./CategoryCardStockLink";
import CategoryCardUnitsLink from "./CategoryCardUnitsLink";

const CategoryCardOptions = ({
  categoryId,
  trackingMode,
}: CategoryCardOptionsProps): React.JSX.Element => (
  <div className={CATEGORY_CARD_OPTIONS_CLASS}>
    <CategoryCardBehaviorLink categoryId={categoryId} />
    <CategoryCardDepositLink categoryId={categoryId} />
    <CategoryCardAlertsLink categoryId={categoryId} />
    <CategoryCardImageLink categoryId={categoryId} />
    {trackingMode === CATEGORY_TRACKING_MODE.BY_UNIT && (
      <CategoryCardUnitsLink categoryId={categoryId} />
    )}
    {trackingMode ===
      CATEGORY_TRACKING_MODE.BY_QUANTITY && (
      <CategoryCardStockLink categoryId={categoryId} />
    )}
  </div>
);

export default CategoryCardOptions;
