import type { ReactNode } from "react";
import type { CategoryConfigureSectionId } from "./CategoryConfigureSectionId.type";
import type { CategoryConfigureSectionModel } from "./CategoryConfigureSectionModel.interface";

export interface CategoryConfigureSectionProps extends CategoryConfigureSectionModel {
  onToggle: (sectionId: CategoryConfigureSectionId) => void;
  children?: ReactNode;
}
