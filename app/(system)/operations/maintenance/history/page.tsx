import type { Metadata } from "next";
import MaintenanceHistory from "@/app/features/operations/maintenance-history/MaintenanceHistory";
import { MAINTENANCE_HISTORY_PAGINATION } from "@/app/features/operations/maintenance-history/constants/MaintenanceHistory.constants";
import { MAINTENANCE_HISTORY_COPY } from "@/app/features/operations/maintenance-history/constants/MaintenanceHistoryCopy.constants";
import { getHistoryPage } from "@/app/features/operations/maintenance-history/utils/getHistoryPage";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: MAINTENANCE_HISTORY_COPY.HEADING,
};

const OperationsMaintenanceHistoryPage = async ({
  searchParams,
}: PageProps<"/operations/maintenance/history">): Promise<JSX.Element> => {
  const params = await searchParams;

  return (
    <MaintenanceHistory
      page={getHistoryPage(
        params[MAINTENANCE_HISTORY_PAGINATION.QUERY_KEY]
      )}
    />
  );
};

export default OperationsMaintenanceHistoryPage;
