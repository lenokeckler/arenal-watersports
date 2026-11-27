import { STATUS } from "@/app/constants";
import { unstable_rethrow } from "next/navigation";
import { CATEGORY_CONFIGURE_SAVE_COPY } from "../constants/CategoryConfigureSaveCopy.constants";
import type { CategoryMutationFeedback } from "../models/CategoryMutationFeedback.interface";

export const runCategoryConfigurationStep = async (
  step: () => Promise<CategoryMutationFeedback>
): Promise<CategoryMutationFeedback> => {
  try {
    return await step();
  } catch (error) {
    unstable_rethrow(error);
    return {
      status: STATUS.ERROR,
      message: CATEGORY_CONFIGURE_SAVE_COPY.FAILED,
    };
  }
};
