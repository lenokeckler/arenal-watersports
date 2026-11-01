import { STATUS } from "@/app/constants";
import type { useToast } from "@/app/components/toast/utils/useToast";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";

export const showUnitGenericErrorToast = (
  showToast: ReturnType<typeof useToast>["showToast"],
  message?: string
): void => {
  showToast(
    STATUS.ERROR,
    message ?? UNIT_CATALOG_COPY.GENERIC_MUTATION_ERROR
  );
};
