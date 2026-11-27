import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { UNIT_HISTORY_COPY } from "../constants/UnitHistoryCopy.constants";
import type { UnitHistorySectionProps } from "../models/UnitHistorySectionProps.interface";
import {
  UNIT_HISTORY_COLUMN_CLASS,
  UNIT_HISTORY_META_CLASS,
  UNIT_HISTORY_SECTION_HEADING_CLASS,
} from "../styles/UnitHistory.styles";
import UnitHistoryDamageCard from "./UnitHistoryDamageCard";
import type { JSX } from "react";

const UnitHistoryDamage = ({
  data,
}: UnitHistorySectionProps): JSX.Element => (
  <Section className={UNIT_HISTORY_COLUMN_CLASS}>
    <Title
      variant={TitleVariant.SECONDARY}
      text={UNIT_HISTORY_COPY.DAMAGE_HEADING}
      className={UNIT_HISTORY_SECTION_HEADING_CLASS}
    />
    {data.reports.length === 0 && (
      <Text className={UNIT_HISTORY_META_CLASS}>
        {UNIT_HISTORY_COPY.DAMAGE_EMPTY}
      </Text>
    )}
    {data.reports.map((report) => (
      <UnitHistoryDamageCard
        key={report.id}
        report={report}
      />
    ))}
  </Section>
);

export default UnitHistoryDamage;
