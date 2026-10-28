import { notFound, redirect } from "next/navigation";
import {
  INVENTORY_TRACKING_MODE,
  PAGINATION,
  PATHS,
} from "@/app/constants";
import { getInventoryCategoryDetails } from "@/app/services/operations/inventory/readInventory";
import InventoryCategoryView from "./InventoryCategoryView";
import type { InventoryCategoryPageProps } from "./models/InventoryCategoryPageProps.interface";
import { isValidInventoryCategoryId } from "./utils/isValidInventoryCategoryId";
import { mapInventoryCategoryDetails } from "./utils/mapInventoryCategoryDetails";
import { resolveInventoryPageIndex } from "./utils/resolveInventoryPageIndex";

const InventoryCategoryPage = async ({
  categoryId,
  pageParameter,
}: InventoryCategoryPageProps): Promise<React.JSX.Element> => {
  if (!isValidInventoryCategoryId(categoryId)) {
    notFound();
  }

  const pageIndex =
    resolveInventoryPageIndex(pageParameter);
  const databaseDetails = await getInventoryCategoryDetails(
    categoryId,
    pageIndex
  );
  const categoryDetails =
    mapInventoryCategoryDetails(databaseDetails);

  if (!categoryDetails) {
    notFound();
  }

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

  return (
    <InventoryCategoryView
      categoryDetails={categoryDetails}
    />
  );
};

export default InventoryCategoryPage;
