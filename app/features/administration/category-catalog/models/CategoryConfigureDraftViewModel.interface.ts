import type { CategoryConfigureDraft } from "./CategoryConfigureDraft.interface";
import type { CategoryConfigureDraftComparison } from "./CategoryConfigureDraftComparison.interface";

export interface CategoryConfigureDraftViewModel extends CategoryConfigureDraftComparison {
  changedCount: number;
  onToggleActive: () => void;
  onBaselineChange: (
    baseline: CategoryConfigureDraft
  ) => void;
}
