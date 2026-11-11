import { redirect } from "next/navigation";
import {
  INVENTORY_TRACKING_MODE,
  PAGINATION,
  PATHS,
} from "@/app/constants";
import type { InventoryCategoryDetails } from "../models/InventoryCategoryDetails.type";

export const redirectToValidInventoryCategoryPage = (
  categoryId: string,
  pageIndex: number,
  categoryDetails: InventoryCategoryDetails
): void => {
  if (
    categoryDetails.category.trackingMode ===
      INVENTORY_TRACKING_MODE.BY_QUANTITY &&
    pageIndex > PAGINATION.DEFAULT_PAGE
  ) {
    redirect(
      PATHS.OPERATIONS.INVENTORY_CATEGORY(categoryId)
    );
  }

  if (
    "units" in categoryDetails &&
    pageIndex >= categoryDetails.units.pageCount
  ) {
    redirect(
      PATHS.OPERATIONS.INVENTORY_CATEGORY_PAGE(
        categoryId,
        categoryDetails.units.pageCount -
          PAGINATION.ONE_PAGE
      )
    );
  }
};
