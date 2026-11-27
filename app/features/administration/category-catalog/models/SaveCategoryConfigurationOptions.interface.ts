import type { CategoryConfigureDraftComparison } from "./CategoryConfigureDraftComparison.interface";

export interface SaveCategoryConfigurationOptions extends CategoryConfigureDraftComparison {
  categoryId: string;
}
