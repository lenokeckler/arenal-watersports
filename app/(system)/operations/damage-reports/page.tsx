import type { Metadata } from "next";
import DamageReports from "@/app/features/operations/damage-reports/DamageReports";
import {
  DAMAGE_REPORTS_PAGINATION,
  DAMAGE_REPORTS_UNIT_QUERY_KEY,
} from "@/app/features/operations/damage-reports/constants/DamageReports.constants";
import { DAMAGE_REPORTS_COPY } from "@/app/features/operations/damage-reports/constants/DamageReportsCopy.constants";
import { getDamageReportsPage } from "@/app/features/operations/damage-reports/utils/getDamageReportsPage";
import { getDamageReportsUnitId } from "@/app/features/operations/damage-reports/utils/getDamageReportsUnitId";
import type { JSX } from "react";

export const metadata: Metadata = {
  title: DAMAGE_REPORTS_COPY.HEADING,
};

const OperationsDamageReportsPage = async ({
  searchParams,
}: PageProps<"/operations/damage-reports">): Promise<JSX.Element> => {
  const params = await searchParams;

  return (
    <DamageReports
      page={getDamageReportsPage(
        params[DAMAGE_REPORTS_PAGINATION.QUERY_KEY]
      )}
      unitId={getDamageReportsUnitId(
        params[DAMAGE_REPORTS_UNIT_QUERY_KEY]
      )}
    />
  );
};

export default OperationsDamageReportsPage;
