import type { Metadata } from "next";
import { MAINTENANCE_JOB_QUERY_PARAM } from "@/app/constants";
import MaintenanceJob from "@/app/features/operations/maintenance-job/MaintenanceJob";
import { MAINTENANCE_JOB_COPY } from "@/app/features/operations/maintenance-job/constants/MaintenanceJobCopy.constants";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: MAINTENANCE_JOB_COPY.HEADING,
};

const OperationsMaintenanceNewPage = async ({
  searchParams,
}: PageProps<"/operations/maintenance/new">): Promise<JSX.Element> => {
  const params = await searchParams;

  return (
    <MaintenanceJob
      unitParam={params[MAINTENANCE_JOB_QUERY_PARAM.UNIT]}
    />
  );
};

export default OperationsMaintenanceNewPage;
