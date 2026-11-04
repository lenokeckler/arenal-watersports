import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";

export type CategoryMutationStatus =
  (typeof CATEGORY_MUTATION_STATUS)[keyof typeof CATEGORY_MUTATION_STATUS];
