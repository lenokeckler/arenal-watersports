import type { NullableRef } from "@/app/types";
import type { CategoryConfigureChipProps } from "./CategoryConfigureChipProps.interface";
import type { CategoryConfigureSectionId } from "./CategoryConfigureSectionId.type";

export interface CategoryConfigureSectionModel {
  id: CategoryConfigureSectionId;
  title: string;
  summary: string;
  badge: NullableRef<CategoryConfigureChipProps>;
  isOpen: boolean;
}
