"use client";

import FormField from "@/app/components/form-field/FormField";
import FuelGauge from "@/app/components/fuel-gauge/FuelGauge";
import FuelPresetButtons from "@/app/components/fuel-gauge/FuelPresetButtons";
import Text from "@/app/components/text/Text";
import {
  INPUT_MODE,
  INPUT_TYPES,
  STRING,
} from "@/app/constants";
import {
  DISPATCH_SHEET_COPY,
  DISPATCH_SHEET_FIELD_ID,
  DISPATCH_USAGE_COPY,
} from "../constants/DispatchSheetCopy.constants";
import type { DispatchUnitReadingCardProps } from "../models/DispatchUnitReadingCardProps.interface";
import {
  DISPATCH_READING_BLOCK_CLASS,
  DISPATCH_READING_CARD_CLASS,
  DISPATCH_READING_LABEL_CLASS,
  DISPATCH_READING_LEGEND_CLASS,
  DISPATCH_SHEET_UNIT_NOTE_CLASS,
} from "../styles/DispatchSheet.styles";

const DispatchUnitReadingCard = ({
  consumesFuel,
  onFuelChange,
  onUsageChange,
  row,
  usageMetric,
}: DispatchUnitReadingCardProps): React.JSX.Element => (
  <fieldset className={DISPATCH_READING_CARD_CLASS}>
    <legend className={DISPATCH_READING_LEGEND_CLASS}>
      {row.code}
    </legend>
    {consumesFuel && (
      <div className={DISPATCH_READING_BLOCK_CLASS}>
        <Text className={DISPATCH_READING_LABEL_CLASS}>
          {DISPATCH_SHEET_COPY.FUEL_LABEL}
        </Text>
        <FuelGauge
          level={row.fuelLevel}
          max={row.fuelMax}
          onSelectLevel={(level) =>
            onFuelChange(row.unitId, String(level))
          }
        />
        <FuelPresetButtons
          level={row.fuelLevel}
          max={row.fuelMax}
          onSelect={(level) =>
            onFuelChange(row.unitId, String(level))
          }
        />
        <FormField
          id={`${DISPATCH_SHEET_FIELD_ID.FUEL_PREFIX}${row.unitId}`}
          name={`${DISPATCH_SHEET_FIELD_ID.FUEL_PREFIX}${row.unitId}`}
          label={DISPATCH_SHEET_COPY.FUEL_FIELD_LABEL}
          labelSuffix={STRING.Empty}
          type={INPUT_TYPES.TEXT}
          inputMode={INPUT_MODE.NUMERIC}
          value={row.fuelText}
          error={row.fuelError ?? undefined}
          showErrorText
          onChange={(event) =>
            onFuelChange(row.unitId, event.target.value)
          }
        />
        <Text className={DISPATCH_SHEET_UNIT_NOTE_CLASS}>
          {row.previousFuel === null
            ? DISPATCH_SHEET_COPY.FUEL_PREVIOUS_NONE
            : `${DISPATCH_SHEET_COPY.FUEL_PREVIOUS_PREFIX}${row.previousFuel}${DISPATCH_SHEET_COPY.SELECTED_OF}${row.fuelMax}.`}
        </Text>
      </div>
    )}
    {usageMetric !== null && (
      <div className={DISPATCH_READING_BLOCK_CLASS}>
        <FormField
          id={`${DISPATCH_SHEET_FIELD_ID.USAGE_PREFIX}${row.unitId}`}
          name={`${DISPATCH_SHEET_FIELD_ID.USAGE_PREFIX}${row.unitId}`}
          label={DISPATCH_USAGE_COPY[usageMetric].LABEL}
          labelSuffix={STRING.Empty}
          type={INPUT_TYPES.TEXT}
          inputMode={INPUT_MODE.DECIMAL}
          value={row.usageText}
          error={row.usageError ?? undefined}
          showErrorText
          onChange={(event) =>
            onUsageChange(row.unitId, event.target.value)
          }
        />
        <Text className={DISPATCH_SHEET_UNIT_NOTE_CLASS}>
          {`${DISPATCH_SHEET_COPY.USAGE_PREVIOUS_PREFIX}${row.usageTotal}${DISPATCH_USAGE_COPY[usageMetric].UNIT}`}
        </Text>
      </div>
    )}
  </fieldset>
);

export default DispatchUnitReadingCard;
