import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import {
  DAMAGE_CAUSE_LABELS,
  DAMAGE_PENDING_LABEL,
} from "@/app/constants";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageReportCardProps } from "../models/DamageReportCardProps.interface";
import {
  DAMAGE_REPORTS_CARD_CLASS,
  DAMAGE_REPORTS_HINT_CLASS,
  DAMAGE_REPORTS_ROW_CLASS,
  DAMAGE_REPORTS_TEXT_CLASS,
} from "../styles/DamageReports.styles";
import DamageReportCardActions from "./DamageReportCardActions";
import DamageReportCardCode from "./DamageReportCardCode";
import type { JSX } from "react";

const DamageReportCard = ({
  report,
}: DamageReportCardProps): JSX.Element => (
  <article className={DAMAGE_REPORTS_CARD_CLASS}>
    <div className={DAMAGE_REPORTS_ROW_CLASS}>
      <DamageReportCardCode report={report} />
      <InlineText className={DAMAGE_REPORTS_HINT_CLASS}>
        {DAMAGE_REPORTS_COPY.HITS(report.hits)}
      </InlineText>
    </div>
    <Text className={DAMAGE_REPORTS_TEXT_CLASS}>
      {report.cause
        ? DAMAGE_REPORTS_COPY.DETAIL(
            DAMAGE_CAUSE_LABELS[report.cause],
            safeString(report.description)
          )
        : (report.description ?? DAMAGE_PENDING_LABEL)}
    </Text>
    <DamageReportCardActions report={report} />
  </article>
);

export default DamageReportCard;
