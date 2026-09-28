import { CategoryMutationStatus } from "./CategoryMutationStatus.type";

export interface CreateCategoryResult {
  status: CategoryMutationStatus;
  categoryId?: string;
  groupNameError?: string;
  message?: string;
}
