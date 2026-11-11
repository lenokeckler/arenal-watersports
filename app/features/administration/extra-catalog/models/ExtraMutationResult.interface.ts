import type { ExtraMutationStatus } from "./ExtraMutationStatus.type";

export interface ExtraMutationResult {
  status: ExtraMutationStatus;
  message?: string;
  nameError?: string;
}
