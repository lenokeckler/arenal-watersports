"use client";

import Text from "@/app/components/text/Text";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import type { DispatchUnitReadingsProps } from "../models/DispatchUnitReadingsProps.interface";
import {
  DISPATCH_READINGS_CLASS,
  DISPATCH_SHEET_LEGEND_CLASS,
  DISPATCH_SHEET_UNIT_NOTE_CLASS,
} from "../styles/DispatchSheet.styles";
import DispatchUnitReadingCard from "./DispatchUnitReadingCard";

const DispatchUnitReadings = ({
  group,
  readings,
}: DispatchUnitReadingsProps): React.JSX.Element | null =>
  readings.rows.length === 0 ? null : (
    <fieldset className={DISPATCH_READINGS_CLASS}>
      <legend className={DISPATCH_SHEET_LEGEND_CLASS}>
        {DISPATCH_SHEET_COPY.READINGS_LEGEND}
      </legend>
      <Text className={DISPATCH_SHEET_UNIT_NOTE_CLASS}>
        {DISPATCH_SHEET_COPY.READINGS_NOTE}
      </Text>
      {readings.rows.map((row) => (
        <DispatchUnitReadingCard
          key={row.unitId}
          consumesFuel={group.consumesFuel}
          onFuelChange={readings.handleFuelChange}
          onUsageChange={readings.handleUsageChange}
          row={row}
          usageMetric={group.usageMetric}
        />
      ))}
    </fieldset>
  );

export default DispatchUnitReadings;
