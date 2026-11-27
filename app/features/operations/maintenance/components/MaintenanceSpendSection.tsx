import Section from "@/app/components/section/Section";
import SpendChart from "@/app/components/spend-chart/SpendChart";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceSpendTableProps } from "../models/MaintenanceSpendTableProps.interface";
import { MAINTENANCE_SECTION_HEADING_CLASS } from "../styles/Maintenance.styles";
import {
  SUMMARY_CHART_CLASS,
  SUMMARY_READOUT_CLASS,
} from "../styles/MaintenanceSummary.styles";
import MaintenanceSpendTable from "./MaintenanceSpendTable";
import type { JSX } from "react";

const MaintenanceSpendSection = ({
  bars,
}: MaintenanceSpendTableProps): JSX.Element => {
  const chosen = bars.find((bar) => bar.isCurrent);

  return (
    <Section className={SUMMARY_CHART_CLASS}>
      <Title
        variant={TitleVariant.SECONDARY}
        text={MAINTENANCE_COPY.SPEND_HEADING}
        className={MAINTENANCE_SECTION_HEADING_CLASS}
      />
      <SpendChart
        bars={bars}
        label={MAINTENANCE_COPY.SPEND_HEADING}
      />
      {chosen && (
        <Text className={SUMMARY_READOUT_CLASS}>
          {MAINTENANCE_COPY.SPEND_READOUT(
            chosen.label,
            chosen.text
          )}
        </Text>
      )}
      <MaintenanceSpendTable bars={bars} />
    </Section>
  );
};

export default MaintenanceSpendSection;
