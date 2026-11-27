import type { Metadata } from "next";
import DamageReport from "@/app/features/operations/damage-report/DamageReport";
import { DAMAGE_REPORT_COPY } from "@/app/features/operations/damage-report/constants/DamageReportCopy.constants";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: DAMAGE_REPORT_COPY.TITLE,
};

const OperationsDamageReportPage = async ({
  searchParams,
}: PageProps<"/operations/damage-report">): Promise<JSX.Element> => {
  const { report, unit } = await searchParams;

  return (
    <DamageReport
      reportParam={report}
      unitParam={unit}
    />
  );
};

export default OperationsDamageReportPage;
