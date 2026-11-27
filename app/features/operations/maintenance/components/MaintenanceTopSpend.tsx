import RankChart from "@/app/components/rank-chart/RankChart";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceTopSpendProps } from "../models/MaintenanceTopSpendProps.interface";
import {
  MAINTENANCE_HINT_CLASS,
  MAINTENANCE_SECTION_HEADING_CLASS,
} from "../styles/Maintenance.styles";
import type { JSX } from "react";

const MaintenanceTopSpend = ({
  rows,
}: MaintenanceTopSpendProps): JSX.Element => (
  <>
    <Title
      variant={TitleVariant.SECONDARY}
      text={MAINTENANCE_COPY.TOP_HEADING}
      className={MAINTENANCE_SECTION_HEADING_CLASS}
    />
    {rows.length === 0 ? (
      <Text className={MAINTENANCE_HINT_CLASS}>
        {MAINTENANCE_COPY.TOP_EMPTY}
      </Text>
    ) : (
      <RankChart
        label={MAINTENANCE_COPY.TOP_HEADING}
        rows={rows}
      />
    )}
  </>
);

export default MaintenanceTopSpend;
