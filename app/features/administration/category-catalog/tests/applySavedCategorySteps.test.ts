import { describe, expect, it } from "vitest";
import { CATEGORY_CONFIGURATION_STEP as STEP } from "../constants/CategoryConfigurationStep.constants";
import { applySavedCategorySteps } from "../utils/applySavedCategorySteps";
import {
  BASELINE_DRAFT,
  buildDraft,
  FAILED_STEP_FEEDBACK,
  ONE_FLAG_EDITED_VALUES,
  SAVED_STEP_FEEDBACK,
} from "./CategoryConfigureSave.constants";
import { buildImageFile } from "./CategoryImage.constants";

const current = buildDraft({
  values: ONE_FLAG_EDITED_VALUES,
  pickedFile: buildImageFile(),
  isActive: false,
});

describe("applySavedCategorySteps", () => {
  it("takes the current draft of the steps that saved and keeps the baseline of the others", () => {
    expect(
      applySavedCategorySteps({
        baseline: BASELINE_DRAFT,
        current,
        steps: {
          [STEP.PHOTO]: FAILED_STEP_FEEDBACK,
          [STEP.SETTINGS]: SAVED_STEP_FEEDBACK,
        },
      })
    ).toEqual({
      ...BASELINE_DRAFT,
      values: current.values,
    });
  });
});
