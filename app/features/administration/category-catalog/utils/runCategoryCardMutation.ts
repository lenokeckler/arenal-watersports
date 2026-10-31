import { unstable_rethrow } from "next/navigation";
import { STATUS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { RunCategoryCardMutationOptions } from "../models/RunCategoryCardMutationOptions.interface";

export const runCategoryCardMutation = async ({
  categoryId,
  mutate,
  successMessage,
  showToast,
  onSuccess,
  setPendingCategoryId,
  onSettled,
}: RunCategoryCardMutationOptions): Promise<void> => {
  setPendingCategoryId(categoryId);

  try {
    const result = await mutate(categoryId);

    if (result.status === CATEGORY_MUTATION_STATUS.ERROR) {
      showToast(
        STATUS.ERROR,
        result.message ??
          CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR
      );
      return;
    }

    showToast(STATUS.SUCCESS, successMessage);
    onSuccess();
  } catch (error) {
    unstable_rethrow(error);
    showToast(
      STATUS.ERROR,
      CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR
    );
  } finally {
    setPendingCategoryId(null);
    onSettled?.();
  }
};
