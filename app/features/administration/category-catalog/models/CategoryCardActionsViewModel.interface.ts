import type { Nullable } from "@/app/types";
import type { CategoryCardDeleteActionsViewModel } from "./CategoryCardDeleteActionsViewModel.interface";

export interface CategoryCardActionsViewModel extends CategoryCardDeleteActionsViewModel {
  pendingCategoryId: Nullable<string>;
}
