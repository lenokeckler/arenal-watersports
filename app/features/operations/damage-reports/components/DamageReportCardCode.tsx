import Link from "@/app/components/link/Link";
import InlineText from "@/app/components/text/InlineText";
import { EQUIPMENT_RETIRED, PATHS } from "@/app/constants";
import type { DamageReportCardPartProps } from "../models/DamageReportCardPartProps.interface";
import { DAMAGE_REPORTS_CODE_CLASS } from "../styles/DamageReports.styles";
import type { JSX } from "react";

const DamageReportCardCode = ({
  report,
}: DamageReportCardPartProps): JSX.Element =>
  report.isRetired ? (
    <InlineText className={DAMAGE_REPORTS_CODE_CLASS}>
      {EQUIPMENT_RETIRED.LABELLED(report.unitCode)}
    </InlineText>
  ) : (
    <Link
      href={PATHS.OPERATIONS.UNIT_HISTORY(report.unitId)}
      className={DAMAGE_REPORTS_CODE_CLASS}
    >
      {report.unitCode}
    </Link>
  );

export default DamageReportCardCode;
