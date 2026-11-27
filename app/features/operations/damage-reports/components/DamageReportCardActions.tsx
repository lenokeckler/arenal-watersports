import Link from "@/app/components/link/Link";
import { PATHS } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageReportCardPartProps } from "../models/DamageReportCardPartProps.interface";
import { DAMAGE_REPORTS_ACTION_CLASS } from "../styles/DamageReports.styles";
import type { JSX } from "react";

const DamageReportCardActions = ({
  report,
}: DamageReportCardPartProps): NullableRef<JSX.Element> =>
  report.isRetired ? null : (
    <>
      {report.isPending && (
        <Link
          href={PATHS.OPERATIONS.DAMAGE_REPORT_COMPLETE(
            report.id
          )}
          className={DAMAGE_REPORTS_ACTION_CLASS}
        >
          {DAMAGE_REPORTS_COPY.COMPLETE}
        </Link>
      )}
      {report.hasPhotos && (
        <Link
          href={PATHS.OPERATIONS.UNIT_PHOTOS(report.unitId)}
          className={DAMAGE_REPORTS_ACTION_CLASS}
        >
          {DAMAGE_REPORTS_COPY.VIEW_PHOTOS}
        </Link>
      )}
    </>
  );

export default DamageReportCardActions;
