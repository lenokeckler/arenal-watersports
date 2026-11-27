import { describe, expect, it } from "vitest";
import { CATEGORY_CONFIGURE_SAVE_STATUS as SAVE_STATUS } from "../constants/CategoryConfigureSaveStatus.constants";
import { CATEGORY_CONFIGURATION_STEP as STEP } from "../constants/CategoryConfigurationStep.constants";
import { resolveCategoryConfigureSaveStatus } from "../utils/resolveCategoryConfigureSaveStatus";
import {
  FAILED_STEP_FEEDBACK,
  SAVED_STEP_FEEDBACK,
} from "./CategoryConfigureSave.constants";

describe("resolveCategoryConfigureSaveStatus", () => {
  it.each([
    {
      scenario: "every step saved",
      steps: {
        [STEP.PHOTO]: SAVED_STEP_FEEDBACK,
        [STEP.SETTINGS]: SAVED_STEP_FEEDBACK,
      },
      expected: SAVE_STATUS.SAVED,
    },
    {
      scenario: "one step failed",
      steps: {
        [STEP.PHOTO]: SAVED_STEP_FEEDBACK,
        [STEP.SETTINGS]: FAILED_STEP_FEEDBACK,
      },
      expected: SAVE_STATUS.FAILED,
    },
    {
      scenario: "every step failed",
      steps: { [STEP.ACTIVE]: FAILED_STEP_FEEDBACK },
      expected: SAVE_STATUS.FAILED,
    },
  ])(
    "is $expected when $scenario",
    ({ steps, expected }) => {
      expect(
        resolveCategoryConfigureSaveStatus(steps)
      ).toBe(expected);
    }
  );
});
