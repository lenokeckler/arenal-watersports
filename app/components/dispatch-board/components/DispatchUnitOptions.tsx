"use client";

import FormField from "@/app/components/form-field/FormField";
import Text from "@/app/components/text/Text";
import { INPUT_TYPES, STRING } from "@/app/constants";
import {
  DISPATCH_SHEET_COPY,
  DISPATCH_SHEET_FIELD_ID,
} from "../constants/DispatchSheetCopy.constants";
import type { DispatchSheetGroup } from "../models/DispatchSheetGroup.interface";
import {
  DISPATCH_SHEET_FIELDSET_CLASS,
  DISPATCH_SHEET_LEGEND_CLASS,
  DISPATCH_SHEET_UNIT_NOTE_CLASS,
} from "../styles/DispatchSheet.styles";

interface DispatchUnitOptionsProps {
  group: DispatchSheetGroup;
  onToggle: (unitId: string) => void;
  selectedUnitIds: string[];
  targetCount: number;
}

const DispatchUnitOptions = ({
  group,
  onToggle,
  selectedUnitIds,
  targetCount,
}: DispatchUnitOptionsProps): React.JSX.Element => (
  <fieldset className={DISPATCH_SHEET_FIELDSET_CLASS}>
    <legend className={DISPATCH_SHEET_LEGEND_CLASS}>
      {DISPATCH_SHEET_COPY.UNITS_LEGEND}
    </legend>
    <Text className={DISPATCH_SHEET_UNIT_NOTE_CLASS}>
      {`${DISPATCH_SHEET_COPY.SELECTED_LABEL} ${selectedUnitIds.length}${DISPATCH_SHEET_COPY.SELECTED_OF}${targetCount}`}
    </Text>
    {group.candidateUnits.length === 0 && (
      <Text className={DISPATCH_SHEET_UNIT_NOTE_CLASS}>
        {DISPATCH_SHEET_COPY.NO_UNITS_FREE}
      </Text>
    )}
    {group.candidateUnits.map((unit) => {
      const isSelected = selectedUnitIds.includes(
        unit.unitId
      );
      const isFull =
        !isSelected &&
        selectedUnitIds.length >= targetCount;

      const unitLabel = unit.isAssigned
        ? `${unit.code}${DISPATCH_SHEET_COPY.GROUP_SEPARATOR}${DISPATCH_SHEET_COPY.ASSIGNED_UNIT}`
        : unit.code;

      return (
        <FormField
          key={unit.unitId}
          id={`${DISPATCH_SHEET_FIELD_ID.UNIT_PREFIX}${unit.unitId}`}
          name={unit.unitId}
          label={unitLabel}
          value={unitLabel}
          labelSuffix={STRING.Empty}
          type={INPUT_TYPES.CHECKBOX}
          checked={isSelected}
          disabled={unit.isAssigned || isFull}
          onChange={() => onToggle(unit.unitId)}
        />
      );
    })}
  </fieldset>
);

export default DispatchUnitOptions;
