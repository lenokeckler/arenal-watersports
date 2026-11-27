import type { CategoryConfigureDraftViewModel } from "./CategoryConfigureDraftViewModel.interface";
import type { CategoryConfigureFields } from "./CategoryConfigureFields.interface";

export interface UseCategoryConfigureSaveOptions {
  categoryId: string;
  draft: CategoryConfigureDraftViewModel;
  fields: CategoryConfigureFields;
}
