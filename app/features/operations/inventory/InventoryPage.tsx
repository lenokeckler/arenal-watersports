import { redirect } from "next/navigation";
import { PAGINATION, PATHS } from "@/app/constants";
import { getInventorySummaryPage } from "@/app/services/operations/inventory/readInventory";
import { readExpiryAlerts } from "@/app/services/operations/inventory/readExpiryAlerts";
import { readQuantityAlerts } from "@/app/services/operations/inventory/readQuantityAlerts";
import InventoryOverviewView from "./InventoryOverviewView";
import type { InventoryPageProps } from "./models/InventoryPageProps.interface";
import { mapInventoryExpiryAlerts } from "./utils/mapInventoryExpiryAlerts";
import { mapInventoryQuantityAlerts } from "./utils/mapInventoryQuantityAlerts";
import { resolveInventoryFilters } from "./utils/resolveInventoryFilters";
import { mapInventorySummary } from "./utils/mapInventorySummary";
import { resolveInventoryPageIndex } from "./utils/resolveInventoryPageIndex";

const InventoryPage = async ({
  modeParameter,
  pageParameter,
  queryParameter,
}: InventoryPageProps): Promise<React.JSX.Element> => {
  const pageIndex =
    resolveInventoryPageIndex(pageParameter);
  const filters = resolveInventoryFilters(
    queryParameter,
    modeParameter
  );
  const [databasePage, quantityAlerts, expiryAlerts] =
    await Promise.all([
      getInventorySummaryPage(pageIndex, {
        mode: filters.mode,
        query: filters.query,
      }),
      readQuantityAlerts(),
      readExpiryAlerts(),
    ]);

  if (pageIndex >= databasePage.pageCount) {
    redirect(
      PATHS.OPERATIONS.INVENTORY_PAGE(
        databasePage.pageCount - PAGINATION.ONE_PAGE
      )
    );
  }

  return (
    <InventoryOverviewView
      filters={filters}
      expiryAlerts={mapInventoryExpiryAlerts(expiryAlerts)}
      quantityAlerts={mapInventoryQuantityAlerts(
        quantityAlerts
      )}
      inventoryPage={{
        ...databasePage,
        items: databasePage.items.map(mapInventorySummary),
      }}
    />
  );
};

export default InventoryPage;
