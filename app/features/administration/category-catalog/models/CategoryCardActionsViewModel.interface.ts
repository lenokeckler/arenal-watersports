import type { Nullable } from "@/app/types";
import type { CategoryCardDeleteActionsViewModel } from "./CategoryCardDeleteActionsViewModel.interface";
import type { CategoryCardStatusActionsViewModel } from "./CategoryCardStatusActionsViewModel.interface";

export interface CategoryCardActionsViewModel
  extends
    CategoryCardDeleteActionsViewModel,
    CategoryCardStatusActionsViewModel {
  pendingCategoryId: Nullable<string>;
}
