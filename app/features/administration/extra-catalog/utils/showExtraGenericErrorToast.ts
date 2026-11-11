import type { useToast } from "@/app/components/toast/utils/useToast";
import { STATUS } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "../constants/ExtraCatalogCopy.constants";

export const showExtraGenericErrorToast = (
  showToast: ReturnType<typeof useToast>["showToast"],
  message?: string
): void => {
  showToast(
    STATUS.ERROR,
    message ?? EXTRA_CATALOG_COPY.GENERIC_MUTATION_ERROR
  );
};
