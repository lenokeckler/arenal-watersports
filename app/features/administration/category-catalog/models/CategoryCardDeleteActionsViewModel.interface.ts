import type { Nullable } from "@/app/types";

export interface CategoryCardDeleteActionsViewModel {
  confirmingCategoryId: Nullable<string>;
  onCancelClick: (categoryId: string) => () => void;
  onConfirmDeleteClick: (
    categoryId: string
  ) => () => Promise<void>;
  onDeleteClick: (categoryId: string) => () => void;
}
