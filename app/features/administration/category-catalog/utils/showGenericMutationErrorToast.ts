import { STATUS } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { useToast } from "@/app/components/toast/utils/useToast";

export const showGenericMutationErrorToast = (
  showToast: ReturnType<typeof useToast>["showToast"]
): void => {
  showToast(
    STATUS.ERROR,
    CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR
  );
};
