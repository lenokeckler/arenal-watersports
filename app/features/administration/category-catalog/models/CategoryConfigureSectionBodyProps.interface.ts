import type { CategoryConfigureBodiesProps } from "./CategoryConfigureBodiesProps.interface";
import type { CategoryConfigureSectionId } from "./CategoryConfigureSectionId.type";
import type { CategoryTrackingMode } from "./CategoryTrackingMode.type";

export interface CategoryConfigureSectionBodyProps {
  sectionId: CategoryConfigureSectionId;
  categoryId: string;
  trackingMode: CategoryTrackingMode;
  bodies: CategoryConfigureBodiesProps;
}
