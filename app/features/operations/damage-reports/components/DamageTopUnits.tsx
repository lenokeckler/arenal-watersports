import RankChart from "@/app/components/rank-chart/RankChart";
import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { DAMAGE_REPORTS_COPY } from "../constants/DamageReportsCopy.constants";
import type { DamageTopUnitsProps } from "../models/DamageTopUnitsProps.interface";
import {
  DAMAGE_REPORTS_COLUMN_CLASS,
  DAMAGE_REPORTS_HINT_CLASS,
  DAMAGE_REPORTS_SECTION_HEADING_CLASS,
} from "../styles/DamageReports.styles";
import type { JSX } from "react";

const DamageTopUnits = ({
  rows,
}: DamageTopUnitsProps): JSX.Element => (
  <Section className={DAMAGE_REPORTS_COLUMN_CLASS}>
    <Title
      variant={TitleVariant.SECONDARY}
      text={DAMAGE_REPORTS_COPY.TOP_HEADING}
      className={DAMAGE_REPORTS_SECTION_HEADING_CLASS}
    />
    {rows.length === 0 ? (
      <Text className={DAMAGE_REPORTS_HINT_CLASS}>
        {DAMAGE_REPORTS_COPY.TOP_EMPTY}
      </Text>
    ) : (
      <RankChart
        label={DAMAGE_REPORTS_COPY.TOP_HEADING}
        rows={rows}
      />
    )}
  </Section>
);

export default DamageTopUnits;
