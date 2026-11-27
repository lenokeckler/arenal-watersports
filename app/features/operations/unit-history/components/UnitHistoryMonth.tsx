import Text from "@/app/components/text/Text";
import { formatMonthName } from "@/app/utils/equipment-months/formatEquipmentDates";
import type { UnitHistoryMonthProps } from "../models/UnitHistoryMonthProps.interface";
import {
  UNIT_HISTORY_COLUMN_CLASS,
  UNIT_HISTORY_MONTH_CLASS,
  UNIT_HISTORY_TIMELINE_CLASS,
} from "../styles/UnitHistory.styles";
import UnitHistoryJobCard from "./UnitHistoryJobCard";
import type { JSX } from "react";

const UnitHistoryMonth = ({
  group,
}: UnitHistoryMonthProps): JSX.Element => (
  <div className={UNIT_HISTORY_COLUMN_CLASS}>
    <Text className={UNIT_HISTORY_MONTH_CLASS}>
      {formatMonthName(group.month)}
    </Text>
    <div className={UNIT_HISTORY_TIMELINE_CLASS}>
      {group.jobs.map((job) => (
        <UnitHistoryJobCard
          key={job.id}
          job={job}
        />
      ))}
    </div>
  </div>
);

export default UnitHistoryMonth;
