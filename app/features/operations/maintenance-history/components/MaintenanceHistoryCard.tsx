import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { MAINTENANCE_HISTORY_COPY } from "../constants/MaintenanceHistoryCopy.constants";
import type { MaintenanceHistoryCardProps } from "../models/MaintenanceHistoryCardProps.interface";
import {
  MAINTENANCE_HISTORY_CARD_CLASS,
  MAINTENANCE_HISTORY_CARD_DETAIL_CLASS,
  MAINTENANCE_HISTORY_CARD_HEADING_CLASS,
} from "../styles/MaintenanceHistory.styles";
import { getEntryDetailText } from "../utils/getEntryDetailText";
import type { JSX } from "react";

const getWorkTypeLabel = (workType: string): string =>
  workType in MAINTENANCE_HISTORY_COPY.WORK_TYPES
    ? MAINTENANCE_HISTORY_COPY.WORK_TYPES[
        workType as keyof typeof MAINTENANCE_HISTORY_COPY.WORK_TYPES
      ]
    : workType;

const MaintenanceHistoryCard = ({
  entry,
}: MaintenanceHistoryCardProps): JSX.Element => (
  <div className={MAINTENANCE_HISTORY_CARD_CLASS}>
    <Title
      id={`${MAINTENANCE_HISTORY_COPY.TITLE_ID_PREFIX}${entry.id}`}
      variant={TitleVariant.SECONDARY}
      text={`${entry.unitCode}${MAINTENANCE_HISTORY_COPY.UNIT_SEPARATOR}${entry.categoryName}`}
      className={MAINTENANCE_HISTORY_CARD_HEADING_CLASS}
    />
    <Text
      className={MAINTENANCE_HISTORY_CARD_HEADING_CLASS}
    >
      {getWorkTypeLabel(entry.workType)}
    </Text>
    {entry.description && (
      <Text
        className={MAINTENANCE_HISTORY_CARD_DETAIL_CLASS}
      >
        {entry.description}
      </Text>
    )}
    <Text className={MAINTENANCE_HISTORY_CARD_DETAIL_CLASS}>
      {getEntryDetailText(entry)}
    </Text>
  </div>
);

export default MaintenanceHistoryCard;
