import type { CategoryConfigureBodiesProps } from "./CategoryConfigureBodiesProps.interface";
import type { NullableRef } from "@/app/types";
import type { CategoryConfigureDeleteProps } from "./CategoryConfigureDeleteProps.interface";
import type { CategoryConfigureSectionId } from "./CategoryConfigureSectionId.type";
import type { CategoryConfigureSectionModel } from "./CategoryConfigureSectionModel.interface";
import type { CategoryConfigureNextStepsProps } from "./CategoryConfigureNextStepsProps.interface";
import type { CategoryConfigureLeaveViewModel } from "./CategoryConfigureLeaveViewModel.interface";
import type { CategoryConfigureSaveBarProps } from "./CategoryConfigureSaveBarProps.interface";
import type { CategoryConfigureStatusCardViewProps } from "./CategoryConfigureStatusCardViewProps.interface";

export interface CategoryConfigureViewModel {
  name: string;
  statusCard: CategoryConfigureStatusCardViewProps;
  nextSteps: NullableRef<CategoryConfigureNextStepsProps>;
  sections: CategoryConfigureSectionModel[];
  bodies: CategoryConfigureBodiesProps;
  deletion: NullableRef<CategoryConfigureDeleteProps>;
  leave: CategoryConfigureLeaveViewModel;
  saveBar: CategoryConfigureSaveBarProps;
  onToggleSection: (
    sectionId: CategoryConfigureSectionId
  ) => void;
}
