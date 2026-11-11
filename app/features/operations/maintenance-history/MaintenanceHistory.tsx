import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import MaintenanceHistoryView from "./MaintenanceHistoryView";
import { MAINTENANCE_HISTORY_COPY } from "./constants/MaintenanceHistoryCopy.constants";
import type { MaintenanceHistoryEntry } from "./models/MaintenanceHistoryEntry.interface";
import type { MaintenanceHistoryProps } from "./models/MaintenanceHistoryProps.interface";
import { getMaintenanceHistory } from "./services/getMaintenanceHistory";
import type { JSX } from "react";

const MaintenanceHistory = async ({
  page,
}: MaintenanceHistoryProps): Promise<JSX.Element> => {
  let entries: MaintenanceHistoryEntry[] = [];
  let hasNextPage = false;
  let errorMessage: NullableRef<string> = null;

  try {
    const result = await getMaintenanceHistory(page);
    entries = result.entries;
    hasNextPage = result.hasNextPage;
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? MAINTENANCE_HISTORY_COPY.FORBIDDEN
        : MAINTENANCE_HISTORY_COPY.ERROR;
  }

  return (
    <MaintenanceHistoryView
      entries={entries}
      errorMessage={errorMessage}
      hasNextPage={hasNextPage}
      page={page}
    />
  );
};

export default MaintenanceHistory;
