import {
  DAMAGE_REPORT_OUTCOME,
  EQUIPMENT_PERIOD,
} from "@/app/constants";
import { OperationsAccessError } from "@/app/services/operations/getOperationsSupabaseClient";
import type { NullableRef } from "@/app/types";
import { toCostaRicaDate } from "@/app/utils/equipment-months/toCostaRicaDate";
import { resolveQueryChoice } from "@/app/utils/query-param/resolveQueryChoice";
import DamageReportsView from "./DamageReportsView";
import { DAMAGE_REPORTS_QUERY } from "./constants/DamageReports.constants";
import { DAMAGE_REPORTS_COPY } from "./constants/DamageReportsCopy.constants";
import type { DamageOverview } from "./models/DamageOverview.interface";
import type { DamageReportsProps } from "./models/DamageReportsProps.interface";
import { getDamageOverview } from "./services/getDamageOverview";
import { resolveDamageFilters } from "./utils/resolveDamageFilters";
import type { JSX } from "react";

const buildEmptyOverview = (): DamageOverview => {
  const today = toCostaRicaDate(new Date());

  return {
    calendarMonths: [],
    calendarReports: [],
    month: today.slice(
      0,
      EQUIPMENT_PERIOD.MONTH_KEY_LENGTH
    ),
    pending: [],
    recent: [],
    today,
  };
};

const DamageReports = async ({
  searchParams = {},
}: DamageReportsProps = {}): Promise<JSX.Element> => {
  let overview = buildEmptyOverview();
  let errorMessage: NullableRef<string> = null;

  try {
    overview = await getDamageOverview(
      searchParams[DAMAGE_REPORTS_QUERY.MONTH]
    );
  } catch (error) {
    errorMessage =
      error instanceof OperationsAccessError
        ? DAMAGE_REPORTS_COPY.FORBIDDEN
        : DAMAGE_REPORTS_COPY.ERROR;
  }

  const saved = resolveQueryChoice(
    searchParams[DAMAGE_REPORTS_QUERY.SAVED],
    Object.values(DAMAGE_REPORT_OUTCOME)
  );

  return (
    <DamageReportsView
      errorMessage={errorMessage}
      filters={resolveDamageFilters(searchParams, overview)}
      overview={overview}
      savedMessage={
        saved ? DAMAGE_REPORTS_COPY.SAVED[saved] : null
      }
    />
  );
};

export default DamageReports;
