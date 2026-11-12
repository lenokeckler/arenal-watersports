import type { Metadata } from "next";
import MaintenanceJob from "@/app/features/operations/maintenance-job/MaintenanceJob";
import { MAINTENANCE_JOB_COPY } from "@/app/features/operations/maintenance-job/constants/MaintenanceJobCopy.constants";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: MAINTENANCE_JOB_COPY.HEADING,
};

const OperationsMaintenanceNewPage = (): JSX.Element => (
  <MaintenanceJob />
);

export default OperationsMaintenanceNewPage;
