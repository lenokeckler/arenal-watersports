import type { ExtraCardReactivationViewModel } from "./ExtraCardReactivationViewModel.interface";
import type { ExtraCardRemovalViewModel } from "./ExtraCardRemovalViewModel.interface";

export interface ExtraCardActionsViewModel
  extends
    ExtraCardRemovalViewModel,
    ExtraCardReactivationViewModel {
  pendingExtraIds: readonly string[];
}
