import { redirect } from "next/navigation";
import { PATHS } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import MaintenanceCostView from "./MaintenanceCostView";
import { MAINTENANCE_COST_COPY } from "./constants/MaintenanceCostReportCopy.constants";
import type { UnitMaintenanceCost } from "./models/UnitMaintenanceCost.interface";
import {
  getMaintenanceCostByUnit,
  MaintenanceCostAccessError,
} from "./services/getMaintenanceCostByUnit";
import type { JSX } from "react";

const MaintenanceCost = async (): Promise<JSX.Element> => {
  let costs: UnitMaintenanceCost[] = [];
  let errorMessage: NullableRef<string> = null;

  try {
    costs = await getMaintenanceCostByUnit();
  } catch (error) {
    if (error instanceof MaintenanceCostAccessError) {
      redirect(PATHS.HOME);
    }

    errorMessage = MAINTENANCE_COST_COPY.ERROR;
  }

  return (
    <MaintenanceCostView
      costs={costs}
      errorMessage={errorMessage}
    />
  );
};

export default MaintenanceCost;
