import type { Metadata } from "next";
import { redirect } from "next/navigation";
import DamageReports from "@/app/features/operations/damage-reports/DamageReports";
import { DAMAGE_REPORTS_LEGACY_UNIT_QUERY } from "@/app/features/operations/damage-reports/constants/DamageReports.constants";
import { DAMAGE_REPORTS_COPY } from "@/app/features/operations/damage-reports/constants/DamageReportsCopy.constants";
import { resolveLegacyUnitId } from "@/app/features/operations/damage-reports/utils/resolveLegacyUnitId";
import { PATHS } from "@/app/constants";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: DAMAGE_REPORTS_COPY.HEADING,
};

const OperationsDamageReportsPage = async ({
  searchParams,
}: PageProps<"/operations/damage-reports">): Promise<JSX.Element> => {
  const params = await searchParams;
  const unitId = resolveLegacyUnitId(
    params[DAMAGE_REPORTS_LEGACY_UNIT_QUERY]
  );

  if (unitId) {
    redirect(PATHS.OPERATIONS.UNIT_HISTORY(unitId));
  }

  return <DamageReports searchParams={params} />;
};

export default OperationsDamageReportsPage;
