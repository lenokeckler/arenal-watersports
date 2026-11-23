import type { CategoryConfigureSaveStatus } from "../constants/CategoryConfigureSaveStatus.constants";
import type { CategoryConfigureSectionId } from "../models/CategoryConfigureSectionId.type";

export interface CategoryConfigureState {
  openSectionIds: CategoryConfigureSectionId[];
  saveStatus: CategoryConfigureSaveStatus;
  isLeavePromptOpen: boolean;
}
