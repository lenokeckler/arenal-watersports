import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";

export type ExtraMutationStatus =
  (typeof EXTRA_MUTATION_STATUS)[keyof typeof EXTRA_MUTATION_STATUS];
