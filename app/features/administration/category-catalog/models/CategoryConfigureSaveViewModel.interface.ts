import type { CategoryConfigureSaveStatus } from "../constants/CategoryConfigureSaveStatus.constants";

export interface CategoryConfigureSaveViewModel {
  saveStatus: CategoryConfigureSaveStatus;
  invalidFieldCount: number;
  onSave: () => Promise<boolean>;
}
