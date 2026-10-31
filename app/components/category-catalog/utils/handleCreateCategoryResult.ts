import { STATUS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CreateCategoryResult } from "../models/CreateCategoryResult.interface";
import type { useToast } from "@/app/components/toast/utils/useToast";
import { showGenericMutationErrorToast } from "./showGenericMutationErrorToast";

interface HandleCreateCategoryResultOptions {
  showToast: ReturnType<typeof useToast>["showToast"];
  onSuccess: () => void;
  onGroupNameError: (groupNameError: string) => void;
  onNameError: (nameError: string) => void;
}

export const handleCreateCategoryResult = (
  result: CreateCategoryResult,
  {
    showToast,
    onSuccess,
    onGroupNameError,
    onNameError,
  }: HandleCreateCategoryResultOptions
): void => {
  if (result.status === CATEGORY_MUTATION_STATUS.SUCCESS) {
    showToast(
      STATUS.SUCCESS,
      CATEGORY_CATALOG_COPY.CREATE_SUCCESS_TOAST
    );
    onSuccess();
    return;
  }

  if (result.nameError) {
    onNameError(result.nameError);
    return;
  }

  if (result.groupNameError) {
    onGroupNameError(result.groupNameError);
    return;
  }

  showGenericMutationErrorToast(showToast);
};
