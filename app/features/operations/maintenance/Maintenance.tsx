import { EQUIPMENT_PERIOD } from "@/app/constants";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import { toCostaRicaDate } from "@/app/utils/equipment-months/toCostaRicaDate";
import MaintenanceView from "./MaintenanceView";
import { MAINTENANCE_COPY } from "./constants/MaintenanceCopy.constants";
import { MAINTENANCE_QUERY } from "./constants/MaintenanceView.constants";
import type { MaintenanceData } from "./models/MaintenanceData.interface";
import type { MaintenanceProps } from "./models/MaintenanceProps.interface";
import { getMaintenanceData } from "./services/getMaintenanceData";
import { resolveMaintenanceFilters } from "./utils/resolveMaintenanceFilters";
import type { JSX } from "react";

const buildEmptyData = (): MaintenanceData => {
  const today = toCostaRicaDate(new Date());

  return {
    calendar: { jobs: [], reports: [] },
    calendarMonths: [],
    jobs: [],
    machines: [],
    month: today.slice(
      0,
      EQUIPMENT_PERIOD.MONTH_KEY_LENGTH
    ),
    months: [],
    overview: { oilDue: [], outOfService: [] },
    today,
  };
};

const Maintenance = async ({
  searchParams = {},
}: MaintenanceProps = {}): Promise<JSX.Element> => {
  let data = buildEmptyData();
  let errorMessage: NullableRef<string> = null;

  try {
    data = await getMaintenanceData(
      searchParams[MAINTENANCE_QUERY.MONTH]
    );
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? MAINTENANCE_COPY.FORBIDDEN
        : MAINTENANCE_COPY.ERROR;
  }

  return (
    <MaintenanceView
      data={data}
      errorMessage={errorMessage}
      filters={resolveMaintenanceFilters(
        searchParams,
        data
      )}
    />
  );
};

export default Maintenance;
