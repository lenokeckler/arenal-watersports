import AlertStrip from "@/app/components/alert-strip/AlertStrip";
import { PATHS } from "@/app/constants";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageSinglePendingProps } from "../models/DamageSinglePendingProps.interface";
import { describePendingReport } from "../utils/describePendingReport";
import type { JSX } from "react";

const DamageSinglePending = ({
  report,
}: DamageSinglePendingProps): JSX.Element => (
  <AlertStrip
    actionLabel={DAMAGE_REPORTS_COPY.PENDING_ONE_ACTION}
    detail={describePendingReport(report)}
    href={PATHS.OPERATIONS.DAMAGE_REPORT_COMPLETE(
      report.id
    )}
    title={DAMAGE_REPORTS_COPY.PENDING_TITLE(1)}
  />
);

export default DamageSinglePending;
