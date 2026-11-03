import { redirect } from "next/navigation";
import { PAGINATION, PATHS } from "@/app/constants";
import { getInventorySummaryPage } from "@/app/services/operations/inventory/readInventory";
import InventoryOverviewView from "./InventoryOverviewView";
import type { InventoryPageProps } from "./models/InventoryPageProps.interface";
import { mapInventorySummary } from "./utils/mapInventorySummary";
import { resolveInventoryPageIndex } from "./utils/resolveInventoryPageIndex";

const InventoryPage = async ({
  pageParameter,
}: InventoryPageProps): Promise<React.JSX.Element> => {
  const pageIndex =
    resolveInventoryPageIndex(pageParameter);
  const databasePage =
    await getInventorySummaryPage(pageIndex);

  if (pageIndex >= databasePage.pageCount) {
    redirect(
      PATHS.OPERATIONS.INVENTORY_PAGE(
        databasePage.pageCount - PAGINATION.ONE_PAGE
      )
    );
  }

  return (
    <InventoryOverviewView
      inventoryPage={{
        ...databasePage,
        items: databasePage.items.map(mapInventorySummary),
      }}
    />
  );
};

export default InventoryPage;
