import type { ExtraMutationStatus } from "./ExtraMutationStatus.type";

export interface ExtraCompatibilityMutationResult {
  status: ExtraMutationStatus;
  message?: string;
}
