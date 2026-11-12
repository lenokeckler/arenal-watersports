import type { Metadata } from "next";
import Maintenance from "@/app/features/operations/maintenance/Maintenance";
import { MAINTENANCE_COPY } from "@/app/features/operations/maintenance/constants/MaintenanceCopy.constants";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: MAINTENANCE_COPY.HEADING,
};

const OperationsMaintenancePage = (): JSX.Element => (
  <Maintenance />
);

export default OperationsMaintenancePage;
