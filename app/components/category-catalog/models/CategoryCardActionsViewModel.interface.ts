import type { Nullable } from "@/app/types";

export interface CategoryCardActionsViewModel {
  pendingCategoryId: Nullable<string>;
  onMarkInactiveClick: (
    categoryId: string
  ) => () => Promise<void>;
}
