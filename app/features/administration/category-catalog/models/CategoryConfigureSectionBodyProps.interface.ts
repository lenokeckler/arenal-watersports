import type { CategoryTrackingMode } from "./CategoryTrackingMode.type";
import type { CategoryConfigureSectionId } from "./CategoryConfigureSectionId.type";

export interface CategoryConfigureSectionBodyProps {
  sectionId: CategoryConfigureSectionId;
  categoryId: string;
  trackingMode: CategoryTrackingMode;
}
