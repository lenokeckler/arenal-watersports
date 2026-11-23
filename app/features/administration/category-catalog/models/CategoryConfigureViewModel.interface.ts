import type { CategoryConfigureBodiesProps } from "./CategoryConfigureBodiesProps.interface";
import type { CategoryConfigureSectionId } from "./CategoryConfigureSectionId.type";
import type { CategoryConfigureSectionModel } from "./CategoryConfigureSectionModel.interface";
import type { CategoryConfigureStatusCardProps } from "./CategoryConfigureStatusCardProps.interface";

export interface CategoryConfigureViewModel {
  name: string;
  statusCard: CategoryConfigureStatusCardProps;
  sections: CategoryConfigureSectionModel[];
  bodies: CategoryConfigureBodiesProps;
  onToggleSection: (
    sectionId: CategoryConfigureSectionId
  ) => void;
}
