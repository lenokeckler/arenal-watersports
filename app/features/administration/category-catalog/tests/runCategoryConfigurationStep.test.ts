import { describe, expect, it } from "vitest";
import { STATUS } from "@/app/constants";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "../constants/CategoryConfigureSaveCopy.constants";
import { runCategoryConfigurationStep } from "../utils/runCategoryConfigurationStep";

const SUCCESS_FEEDBACK = {
  status: STATUS.SUCCESS,
  message: CATEGORY_CONFIGURE_SAVE_COPY.SAVED,
};

describe("runCategoryConfigurationStep", () => {
  it("returns the feedback of the step", async () => {
    await expect(
      runCategoryConfigurationStep(() =>
        Promise.resolve(SUCCESS_FEEDBACK)
      )
    ).resolves.toEqual(SUCCESS_FEEDBACK);
  });

  it("turns a thrown error into the failed feedback", async () => {
    await expect(
      runCategoryConfigurationStep(() =>
        Promise.reject(new Error("network"))
      )
    ).resolves.toEqual({
      status: STATUS.ERROR,
      message: CATEGORY_CONFIGURE_SAVE_COPY.FAILED,
    });
  });
});
