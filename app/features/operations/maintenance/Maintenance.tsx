import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import MaintenanceView from "./MaintenanceView";
import { MAINTENANCE_COPY } from "./constants/MaintenanceCopy.constants";
import type { MaintenanceOverview } from "./models/MaintenanceOverview.interface";
import { getMaintenanceOverview } from "./services/getMaintenanceOverview";
import type { JSX } from "react";

const Maintenance = async (): Promise<JSX.Element> => {
  let overview: MaintenanceOverview = {
    oilDue: [],
    outOfService: [],
  };
  let errorMessage: NullableRef<string> = null;

  try {
    overview = await getMaintenanceOverview();
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? MAINTENANCE_COPY.FORBIDDEN
        : MAINTENANCE_COPY.ERROR;
  }

  return (
    <MaintenanceView
      errorMessage={errorMessage}
      overview={overview}
    />
  );
};

export default Maintenance;
