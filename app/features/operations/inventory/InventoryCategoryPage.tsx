import { notFound } from "next/navigation";
import { getInventoryCategoryDetails } from "@/app/services/operations/inventory/readInventory";
import InventoryCategoryView from "./InventoryCategoryView";
import type { InventoryCategoryPageProps } from "./models/InventoryCategoryPageProps.interface";
import { isValidInventoryCategoryId } from "./utils/isValidInventoryCategoryId";
import { mapInventoryCategoryDetails } from "./utils/mapInventoryCategoryDetails";
import { resolveInventoryPageIndex } from "./utils/resolveInventoryPageIndex";
import { redirectToValidInventoryCategoryPage } from "./utils/redirectToValidInventoryCategoryPage";

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

  redirectToValidInventoryCategoryPage(
    categoryId,
    pageIndex,
    categoryDetails
  );

  return (
    <InventoryCategoryView
      categoryDetails={categoryDetails}
    />
  );
};

export default InventoryCategoryPage;
