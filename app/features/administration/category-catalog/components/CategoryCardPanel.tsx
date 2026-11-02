import type { CategoryCardPanelProps } from "../models/CategoryCardPanelProps.interface";
import { CATEGORY_CARD_PANEL_CLASS } from "../styles/CategoryCardPanel.styles";
import CategoryCardActions from "./CategoryCardActions";
import CategoryCardOptions from "./CategoryCardOptions";

const CategoryCardPanel = ({
  category,
  panelId,
  ...actionProps
}: CategoryCardPanelProps): React.JSX.Element => (
  <div
    id={panelId}
    className={CATEGORY_CARD_PANEL_CLASS}
  >
    <CategoryCardOptions
      categoryId={category.id}
      trackingMode={category.trackingMode}
    />
    <CategoryCardActions {...actionProps} />
  </div>
);

export default CategoryCardPanel;
