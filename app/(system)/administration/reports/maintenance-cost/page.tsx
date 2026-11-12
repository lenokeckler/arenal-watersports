import type { Metadata } from "next";
import MaintenanceCost from "@/app/features/administration/maintenance-cost-report/MaintenanceCost";
import { MAINTENANCE_COST_COPY } from "@/app/features/administration/maintenance-cost-report/constants/MaintenanceCostReportCopy.constants";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: MAINTENANCE_COST_COPY.HEADING,
};

const MaintenanceCostPage = (): JSX.Element => (
  <MaintenanceCost />
);

export default MaintenanceCostPage;
