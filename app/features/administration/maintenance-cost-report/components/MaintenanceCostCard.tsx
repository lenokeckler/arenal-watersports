import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { MAINTENANCE_COST_COPY } from "../constants/MaintenanceCostReportCopy.constants";
import type { MaintenanceCostCardProps } from "../models/MaintenanceCostCardProps.interface";
import {
  MAINTENANCE_COST_CARD_CLASS,
  MAINTENANCE_COST_CARD_DETAIL_CLASS,
  MAINTENANCE_COST_CARD_HEADING_CLASS,
  MAINTENANCE_COST_TOTAL_CLASS,
} from "../styles/MaintenanceCostReport.styles";
import { formatCostTotal } from "../utils/formatCostTotal";
import { formatLastJobDate } from "../utils/formatLastJobDate";
import type { JSX } from "react";

const MaintenanceCostCard = ({
  cost,
}: MaintenanceCostCardProps): JSX.Element => (
  <div className={MAINTENANCE_COST_CARD_CLASS}>
    <Title
      id={`${MAINTENANCE_COST_COPY.TITLE_ID_PREFIX}${cost.unitId}`}
      variant={TitleVariant.SECONDARY}
      text={`${cost.unitCode}${MAINTENANCE_COST_COPY.UNIT_SEPARATOR}${cost.categoryName}`}
      className={MAINTENANCE_COST_CARD_HEADING_CLASS}
    />
    <Text className={MAINTENANCE_COST_TOTAL_CLASS}>
      {formatCostTotal(cost)}
    </Text>
    <Text className={MAINTENANCE_COST_CARD_DETAIL_CLASS}>
      {`${MAINTENANCE_COST_COPY.JOBS_PREFIX}${cost.jobsCount}${MAINTENANCE_COST_COPY.PART_SEPARATOR}${MAINTENANCE_COST_COPY.LAST_JOB_PREFIX}${formatLastJobDate(cost.lastPerformedAt)}`}
    </Text>
  </div>
);

export default MaintenanceCostCard;
