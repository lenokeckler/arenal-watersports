import { STATUS } from "@/app/constants";
import { CATEGORY_CONFIGURATION_STEP } from "../constants/CategoryConfigurationStep.constants";
import type { ApplySavedCategoryStepsOptions } from "../models/ApplySavedCategoryStepsOptions.interface";
import type { CategoryConfigureDraft } from "../models/CategoryConfigureDraft.interface";

export const applySavedCategorySteps = ({
  baseline,
  current,
  steps,
}: ApplySavedCategoryStepsOptions): CategoryConfigureDraft => {
  const isSaved = (step: keyof typeof steps): boolean =>
    steps[step]?.status === STATUS.SUCCESS;

  return {
    values: isSaved(CATEGORY_CONFIGURATION_STEP.SETTINGS)
      ? current.values
      : baseline.values,
    pickedFile: isSaved(CATEGORY_CONFIGURATION_STEP.PHOTO)
      ? current.pickedFile
      : baseline.pickedFile,
    isActive: isSaved(CATEGORY_CONFIGURATION_STEP.ACTIVE)
      ? current.isActive
      : baseline.isActive,
  };
};
