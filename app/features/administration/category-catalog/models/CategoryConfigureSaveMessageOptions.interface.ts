import type { CategoryConfigureSaveStatus } from "../constants/CategoryConfigureSaveStatus.constants";

export interface CategoryConfigureSaveMessageOptions {
  status: CategoryConfigureSaveStatus;
  changedCount: number;
  invalidFieldCount: number;
}
