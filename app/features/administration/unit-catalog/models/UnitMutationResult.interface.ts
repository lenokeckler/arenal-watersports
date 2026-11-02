import type { UnitMutationStatus } from "../constants/UnitMutationStatus.constants";

export interface UnitMutationResult {
  status: UnitMutationStatus;
  unitId?: string;
  codeError?: string;
  message?: string;
}
