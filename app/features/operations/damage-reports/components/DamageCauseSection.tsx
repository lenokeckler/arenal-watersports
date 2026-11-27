import CauseChart from "@/app/components/cause-chart/CauseChart";
import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { DAMAGE_TAB } from "../constants/DamageReports.constants";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageCauseSectionProps } from "../models/DamageCauseSectionProps.interface";
import { buildDamageReportsHref } from "../utils/buildDamageReportsHref";
import {
  DAMAGE_REPORTS_COLUMN_CLASS,
  DAMAGE_REPORTS_HINT_CLASS,
  DAMAGE_REPORTS_SECTION_HEADING_CLASS,
} from "../styles/DamageReports.styles";
import type { JSX } from "react";

const DamageCauseSection = ({
  filters,
  summary,
}: DamageCauseSectionProps): JSX.Element => (
  <Section className={DAMAGE_REPORTS_COLUMN_CLASS}>
    <Title
      variant={TitleVariant.SECONDARY}
      text={DAMAGE_REPORTS_COPY.CHART_LABEL}
      className={DAMAGE_REPORTS_SECTION_HEADING_CLASS}
    />
    <CauseChart
      label={DAMAGE_REPORTS_COPY.CHART_LABEL}
      counts={summary.causeCounts}
      resolveHref={(cause) =>
        buildDamageReportsHref(filters, {
          cause,
          tab: DAMAGE_TAB.CALENDAR,
        })
      }
    />
    <Text className={DAMAGE_REPORTS_HINT_CLASS}>
      {summary.hasPendingInPeriod
        ? `${DAMAGE_REPORTS_COPY.CHART_HINT} ${DAMAGE_REPORTS_COPY.CHART_HINT_PENDING}`
        : DAMAGE_REPORTS_COPY.CHART_HINT}
    </Text>
  </Section>
);

export default DamageCauseSection;
