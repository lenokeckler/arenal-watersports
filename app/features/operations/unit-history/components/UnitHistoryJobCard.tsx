import InlineText from "@/app/components/text/InlineText";
import Text from "@/app/components/text/Text";
import { MAINTENANCE_WORK_TYPE_LABELS } from "@/app/constants";
import { formatShortDay } from "@/app/utils/equipment-months/formatEquipmentDates";
import type { UnitHistoryJobCardProps } from "../models/UnitHistoryJobCardProps.interface";
import { describeJobCost } from "../utils/describeJobCost";
import {
  UNIT_HISTORY_CARD_CLASS,
  UNIT_HISTORY_META_CLASS,
  UNIT_HISTORY_ROW_CLASS,
  UNIT_HISTORY_TEXT_CLASS,
  UNIT_HISTORY_TITLE_CLASS,
} from "../styles/UnitHistory.styles";
import type { JSX } from "react";

const UnitHistoryJobCard = ({
  job,
}: UnitHistoryJobCardProps): JSX.Element => (
  <article className={UNIT_HISTORY_CARD_CLASS}>
    <div className={UNIT_HISTORY_ROW_CLASS}>
      <InlineText className={UNIT_HISTORY_TITLE_CLASS}>
        {MAINTENANCE_WORK_TYPE_LABELS[job.workType] ??
          job.workType}
      </InlineText>
      <InlineText className={UNIT_HISTORY_META_CLASS}>
        {formatShortDay(job.date)}
      </InlineText>
    </div>
    {job.description && (
      <Text className={UNIT_HISTORY_TEXT_CLASS}>
        {job.description}
      </Text>
    )}
    <Text className={UNIT_HISTORY_META_CLASS}>
      {describeJobCost(job)}
    </Text>
  </article>
);

export default UnitHistoryJobCard;
