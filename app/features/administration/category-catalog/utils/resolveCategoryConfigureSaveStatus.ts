import { STATUS } from "@/app/constants";
import {
  CATEGORY_CONFIGURE_SAVE_STATUS,
  type CategoryConfigureSaveStatus,
} from "../constants/CategoryConfigureSaveStatus.constants";
import type { CategoryConfigurationSaveOutcome } from "../models/CategoryConfigurationSaveOutcome.interface";

export const resolveCategoryConfigureSaveStatus = (
  steps: CategoryConfigurationSaveOutcome["steps"]
): CategoryConfigureSaveStatus =>
  Object.values(steps).every(
    (feedback) => feedback?.status === STATUS.SUCCESS
  )
    ? CATEGORY_CONFIGURE_SAVE_STATUS.SAVED
    : CATEGORY_CONFIGURE_SAVE_STATUS.FAILED;
