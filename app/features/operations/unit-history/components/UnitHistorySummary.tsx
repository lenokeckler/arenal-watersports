import Text from "@/app/components/text/Text";
import { UNIT_HISTORY_SEPARATOR } from "../constants/UnitHistory.constants";
import { UNIT_HISTORY_COPY } from "../constants/UnitHistoryCopy.constants";
import type { UnitHistorySectionProps } from "../models/UnitHistorySectionProps.interface";
import { formatUnitReading } from "../utils/formatUnitReading";
import {
  UNIT_HISTORY_META_CLASS,
  UNIT_HISTORY_STATUS_CLASS,
} from "../styles/UnitHistory.styles";
import UnitHistoryNextOil from "./UnitHistoryNextOil";
import UnitHistoryStats from "./UnitHistoryStats";
import type { JSX } from "react";

const UnitHistorySummary = ({
  data,
}: UnitHistorySectionProps): JSX.Element => {
  const { unit } = data;
  const reading = unit.usageMetric
    ? formatUnitReading(unit.usageTotal, unit.usageMetric)
    : null;

  return (
    <>
      <Text className={UNIT_HISTORY_STATUS_CLASS}>
        {UNIT_HISTORY_COPY.STATUS[unit.status]}
      </Text>
      <Text className={UNIT_HISTORY_META_CLASS}>
        {[unit.categoryName, reading]
          .filter(Boolean)
          .join(UNIT_HISTORY_SEPARATOR)}
      </Text>
      <UnitHistoryNextOil unit={unit} />
      <UnitHistoryStats data={data} />
    </>
  );
};

export default UnitHistorySummary;
