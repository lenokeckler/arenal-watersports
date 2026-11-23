import type { CategoryConfigureBodiesProps } from "./CategoryConfigureBodiesProps.interface";
import type { NullableRef } from "@/app/types";
import type { CategoryConfigureDeleteProps } from "./CategoryConfigureDeleteProps.interface";
import type { CategoryConfigureSectionId } from "./CategoryConfigureSectionId.type";
import type { CategoryConfigureSectionModel } from "./CategoryConfigureSectionModel.interface";
import type { CategoryConfigureStatusCardProps } from "./CategoryConfigureStatusCardProps.interface";

export interface CategoryConfigureViewModel {
  name: string;
  statusCard: CategoryConfigureStatusCardProps;
  sections: CategoryConfigureSectionModel[];
  bodies: CategoryConfigureBodiesProps;
  deletion: NullableRef<CategoryConfigureDeleteProps>;
  onToggleSection: (
    sectionId: CategoryConfigureSectionId
  ) => void;
}
