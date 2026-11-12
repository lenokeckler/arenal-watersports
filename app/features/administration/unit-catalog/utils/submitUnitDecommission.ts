import { unstable_rethrow } from "next/navigation";
import { STATUS } from "@/app/constants";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import type { UnitDecommissionSubmitOptions } from "../models/UnitDecommissionSubmitOptions.interface";
import { decommissionUnitAction } from "../services/decommissionUnitAction";
import { showUnitGenericErrorToast } from "./showUnitGenericErrorToast";

export const submitUnitDecommission = async ({
  input,
  showToast,
  onDecommissioned,
}: UnitDecommissionSubmitOptions): Promise<void> => {
  try {
    const result = await decommissionUnitAction(input);

    if (result.status === UNIT_MUTATION_STATUS.ERROR) {
      showUnitGenericErrorToast(
        showToast,
        result.message ??
          UNIT_CATALOG_COPY.DECOMMISSION_GENERIC_ERROR
      );
      return;
    }

    showToast(
      STATUS.SUCCESS,
      UNIT_CATALOG_COPY.DECOMMISSION_SUCCESS_TOAST
    );
    onDecommissioned();
  } catch (error) {
    unstable_rethrow(error);
    showUnitGenericErrorToast(
      showToast,
      UNIT_CATALOG_COPY.DECOMMISSION_GENERIC_ERROR
    );
  }
};
