import type { CategoryConfigureDraft } from "./CategoryConfigureDraft.interface";

export interface CategoryConfigureDraftComparison {
  baseline: CategoryConfigureDraft;
  current: CategoryConfigureDraft;
}
