import type { Nullable } from "@/app/types";

export interface CategoryCardActionsViewModel {
  confirmingCategoryId: Nullable<string>;
  pendingCategoryId: Nullable<string>;
  onCancelClick: (categoryId: string) => () => void;
  onConfirmDeleteClick: (
    categoryId: string
  ) => () => Promise<void>;
  onDeleteClick: (categoryId: string) => () => void;
  onMarkInactiveClick: (
    categoryId: string
  ) => () => Promise<void>;
}
