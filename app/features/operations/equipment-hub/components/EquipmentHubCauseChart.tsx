import CauseChart from "@/app/components/cause-chart/CauseChart";
import Section from "@/app/components/section/Section";
import Text from "@/app/components/text/Text";
import { PATHS } from "@/app/constants";
import { countDamageByCause } from "@/app/utils/equipment-stats/countDamageByCause";
import { EQUIPMENT_HUB_COPY } from "../constants/EquipmentHubCopy.constants";
import type { EquipmentHubCauseChartProps } from "../models/EquipmentHubCauseChartProps.type";
import {
  EQUIPMENT_HUB_CARD_DETAIL_CLASS,
  EQUIPMENT_HUB_CHART_CLASS,
} from "../styles/EquipmentHub.styles";
import EquipmentHubChartHeader from "./EquipmentHubChartHeader";
import type { JSX } from "react";

const EquipmentHubCauseChart = ({
  reports,
}: EquipmentHubCauseChartProps): JSX.Element => (
  <Section className={EQUIPMENT_HUB_CHART_CLASS}>
    <EquipmentHubChartHeader
      href={PATHS.OPERATIONS.DAMAGE_REPORTS}
      linkLabel={EQUIPMENT_HUB_COPY.SEE_DAMAGE}
      title={EQUIPMENT_HUB_COPY.CAUSE_HEADING}
    />
    <Text className={EQUIPMENT_HUB_CARD_DETAIL_CLASS}>
      {EQUIPMENT_HUB_COPY.CAUSE_PERIOD}
    </Text>
    <CauseChart
      label={EQUIPMENT_HUB_COPY.CAUSE_HEADING}
      counts={countDamageByCause(reports)}
      resolveHref={PATHS.OPERATIONS.DAMAGE_REPORTS_BY_CAUSE}
    />
  </Section>
);

export default EquipmentHubCauseChart;
