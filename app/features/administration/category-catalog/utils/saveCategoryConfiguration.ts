import { CATEGORY_CONFIGURE_SAVE_COPY } from "../constants/CategoryConfigureSaveCopy.constants";
import { CATEGORY_CONFIGURATION_STEP } from "../constants/CategoryConfigurationStep.constants";
import type { CategoryConfigurationSaveOutcome } from "../models/CategoryConfigurationSaveOutcome.interface";
import type { CategoryMutationFeedback } from "../models/CategoryMutationFeedback.interface";
import type { SaveCategoryConfigurationOptions } from "../models/SaveCategoryConfigurationOptions.interface";
import { markCategoryInactiveAction } from "../services/markCategoryInactiveAction";
import { reactivateCategoryAction } from "../services/reactivateCategoryAction";
import { updateCategoryConfigurationAction } from "../services/updateCategoryConfigurationAction";
import { countChangedValues } from "./countChangedValues";
import { mapCategoryAlertFormValuesToInput } from "./mapCategoryAlertFormValuesToInput";
import { mapCategoryBehaviorFormValuesToInput } from "./mapCategoryBehaviorFormValuesToInput";
import { mapCategoryDepositFormValuesToInput } from "./mapCategoryDepositFormValuesToInput";
import { resolveCategoryMutationFeedback } from "./resolveCategoryMutationFeedback";
import { runCategoryConfigurationStep } from "./runCategoryConfigurationStep";
import { saveCategoryImage } from "./saveCategoryImage";
import { validateCategoryConfiguration } from "./validateCategoryConfiguration";

const saveSettings = async ({
  categoryId,
  current,
}: SaveCategoryConfigurationOptions): Promise<CategoryMutationFeedback> =>
  resolveCategoryMutationFeedback(
    await updateCategoryConfigurationAction({
      categoryId,
      behavior: mapCategoryBehaviorFormValuesToInput(
        categoryId,
        current.values.behavior
      ),
      deposit: mapCategoryDepositFormValuesToInput(
        categoryId,
        current.values.deposit
      ),
      alerts: mapCategoryAlertFormValuesToInput(
        categoryId,
        current.values.alerts
      ),
    }),
    CATEGORY_CONFIGURE_SAVE_COPY.SAVED
  );

const saveActive = async ({
  categoryId,
  current,
}: SaveCategoryConfigurationOptions): Promise<CategoryMutationFeedback> =>
  resolveCategoryMutationFeedback(
    current.isActive
      ? await reactivateCategoryAction(categoryId)
      : await markCategoryInactiveAction(categoryId),
    CATEGORY_CONFIGURE_SAVE_COPY.SAVED
  );

export const saveCategoryConfiguration = async (
  options: SaveCategoryConfigurationOptions
): Promise<CategoryConfigurationSaveOutcome> => {
  const { baseline, categoryId, current } = options;
  const validation = validateCategoryConfiguration(
    current.values
  );
  const steps: CategoryConfigurationSaveOutcome["steps"] =
    {};
  if (!validation.isValid) {
    return { validation, steps };
  }

  const pickedFile = current.pickedFile;
  if (pickedFile && pickedFile !== baseline.pickedFile) {
    steps[CATEGORY_CONFIGURATION_STEP.PHOTO] =
      await runCategoryConfigurationStep(() =>
        saveCategoryImage({ categoryId, file: pickedFile })
      );
  }
  if (
    countChangedValues(baseline.values, current.values) > 0
  ) {
    steps[CATEGORY_CONFIGURATION_STEP.SETTINGS] =
      await runCategoryConfigurationStep(() =>
        saveSettings(options)
      );
  }
  if (current.isActive !== baseline.isActive) {
    steps[CATEGORY_CONFIGURATION_STEP.ACTIVE] =
      await runCategoryConfigurationStep(() =>
        saveActive(options)
      );
  }

  return { validation, steps };
};
