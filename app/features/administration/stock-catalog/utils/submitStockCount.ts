import { unstable_rethrow } from "next/navigation";
import { STATUS } from "@/app/constants";
import { STOCK_CATALOG_COPY } from "../constants/StockCatalogCopy.constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_MUTATION_STATUS } from "../constants/StockMutationStatus.constants";
import type { SubmitStockCountOptions } from "../models/SubmitStockCountOptions.interface";
import { adjustStockAction } from "../services/adjustStockAction";

export const submitStockCount = async ({
  input,
  onSaved,
  showToast,
}: SubmitStockCountOptions): Promise<void> => {
  try {
    const result = await adjustStockAction(input);

    if (result.status === STOCK_MUTATION_STATUS.ERROR) {
      showToast(
        STATUS.ERROR,
        result.message ??
          STOCK_CATALOG_COPY.ADJUSTMENT_FAILED_ERROR
      );
      return;
    }

    showToast(
      STATUS.SUCCESS,
      STOCK_COUNT_COPY.SAVE_SUCCESS_TOAST
    );
    onSaved();
  } catch (error) {
    unstable_rethrow(error);
    showToast(
      STATUS.ERROR,
      STOCK_CATALOG_COPY.ADJUSTMENT_FAILED_ERROR
    );
  }
};
