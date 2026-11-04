import { CategoryMutationStatus } from "./CategoryMutationStatus.type";

export interface CategoryMutationResult {
  status: CategoryMutationStatus;
  message?: string;
}
