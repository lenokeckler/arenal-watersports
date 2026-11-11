import type { CategoryCardActionsProps } from "./CategoryCardActionsProps.interface";
import type { CategoryListItem } from "./CategoryListItem.interface";

export interface CategoryCardPanelProps extends CategoryCardActionsProps {
  category: CategoryListItem;
  panelId: string;
}
