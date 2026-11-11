import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import DamageReportsView from "./DamageReportsView";
import { DAMAGE_REPORTS_COPY } from "./constants/DamageReportsCopy.constants";
import type { DamageReportEntry } from "./models/DamageReportEntry.interface";
import type { DamageReportsProps } from "./models/DamageReportsProps.interface";
import type { DamageReportsUnit } from "./models/DamageReportsUnit.interface";
import { getUnitDamageReports } from "./services/getUnitDamageReports";
import type { JSX } from "react";

const DamageReports = async ({
  page,
  unitId,
}: DamageReportsProps): Promise<JSX.Element> => {
  let entries: DamageReportEntry[] = [];
  let hasNextPage = false;
  let unit: NullableRef<DamageReportsUnit> = null;
  let errorMessage: NullableRef<string> = null;

  try {
    if (unitId) {
      const result = await getUnitDamageReports(
        unitId,
        page
      );
      entries = result.entries;
      hasNextPage = result.hasNextPage;
      unit = result.unit;
    }
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? DAMAGE_REPORTS_COPY.FORBIDDEN
        : DAMAGE_REPORTS_COPY.ERROR;
  }

  return (
    <DamageReportsView
      entries={entries}
      errorMessage={errorMessage}
      hasNextPage={hasNextPage}
      page={page}
      unit={unit}
    />
  );
};

export default DamageReports;
