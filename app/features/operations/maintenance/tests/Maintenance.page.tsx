import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import MaintenanceView from "../MaintenanceView";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceData } from "../models/MaintenanceData.interface";
import { resolveMaintenanceFilters } from "../utils/resolveMaintenanceFilters";
import { MAINTENANCE_DATA } from "./MaintenanceData.constants";

const queries = {
  getLink: (name: string | RegExp) =>
    screen.getByRole(ARIA_ROLE.LINK, { name }),
  queryLink: (name: string | RegExp) =>
    screen.queryByRole(ARIA_ROLE.LINK, { name }),
  getText: (text: string | RegExp) =>
    screen.getByText(text),
  queryText: (text: string | RegExp) =>
    screen.queryByText(text),
  queryDialog: () => screen.queryByRole("dialog"),
  getAlert: () => screen.getByRole(ARIA_ROLE.ALERT),
  chooseMachine: (unitId: string) =>
    fireEvent.change(
      screen.getByLabelText(MAINTENANCE_COPY.MACHINE_LABEL),
      { target: { value: unitId } }
    ),
};

export const createMaintenancePage = (
  params: Record<string, string> = {},
  data: MaintenanceData = MAINTENANCE_DATA,
  errorMessage: NullableRef<string> = null
) => {
  render(
    <MaintenanceView
      data={data}
      errorMessage={errorMessage}
      filters={resolveMaintenanceFilters(params, data)}
    />
  );

  return queries;
};
