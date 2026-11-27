import Link from "@/app/components/link/Link";
import LinkSheet from "@/app/components/link-sheet/LinkSheet";
import InlineText from "@/app/components/text/InlineText";
import { PATHS } from "@/app/constants";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamagePendingSheetProps } from "../models/DamagePendingSheetProps.interface";
import { describePendingReport } from "../utils/describePendingReport";
import {
  DAMAGE_REPORTS_CODE_CLASS,
  DAMAGE_REPORTS_HINT_CLASS,
  DAMAGE_REPORTS_PENDING_ROW_CLASS,
} from "../styles/DamageReports.styles";
import type { JSX } from "react";

const DamagePendingSheet = ({
  closeHref,
  reports,
  title,
}: DamagePendingSheetProps): JSX.Element => (
  <LinkSheet
    closeHref={closeHref}
    title={title}
  >
    {reports.map((report) => (
      <Link
        key={report.id}
        href={PATHS.OPERATIONS.DAMAGE_REPORT_COMPLETE(
          report.id
        )}
        className={DAMAGE_REPORTS_PENDING_ROW_CLASS}
      >
        <InlineText className={DAMAGE_REPORTS_CODE_CLASS}>
          {describePendingReport(report)}
        </InlineText>
        <InlineText className={DAMAGE_REPORTS_HINT_CLASS}>
          {DAMAGE_REPORTS_COPY.COMPLETE}
        </InlineText>
      </Link>
    ))}
  </LinkSheet>
);

export default DamagePendingSheet;
