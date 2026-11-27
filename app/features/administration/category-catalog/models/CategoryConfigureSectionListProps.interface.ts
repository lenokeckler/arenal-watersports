import type { CategoryConfigureBodiesProps } from "./CategoryConfigureBodiesProps.interface";
import type { CategoryConfigureSectionId } from "./CategoryConfigureSectionId.type";
import type { CategoryConfigureSectionModel } from "./CategoryConfigureSectionModel.interface";
import type { CategoryTrackingMode } from "./CategoryTrackingMode.type";

export interface CategoryConfigureSectionListProps {
  categoryId: string;
  trackingMode: CategoryTrackingMode;
  bodies: CategoryConfigureBodiesProps;
  sections: CategoryConfigureSectionModel[];
  onToggleSection: (
    sectionId: CategoryConfigureSectionId
  ) => void;
}
