"use client";

import Text from "@/app/components/text/Text";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import type { DispatchUnitGridProps } from "../models/DispatchUnitGridProps.interface";
import {
  DISPATCH_SHEET_FIELDSET_CLASS,
  DISPATCH_SHEET_LEGEND_CLASS,
  DISPATCH_SHEET_UNIT_NOTE_CLASS,
} from "../styles/DispatchSheet.styles";
import { DISPATCH_UNIT_GRID_CLASS } from "../styles/DispatchUnitCard.styles";
import { resolveDispatchGroupImage } from "../utils/resolveDispatchGroupImage";
import DispatchUnitCard from "./DispatchUnitCard";

const DispatchUnitGrid = ({
  group,
  onToggle,
  selectedUnitIds,
  targetCount,
}: DispatchUnitGridProps): React.JSX.Element => {
  const image = resolveDispatchGroupImage(group);

  return (
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
      <div className={DISPATCH_UNIT_GRID_CLASS}>
        {group.candidateUnits.map((unit) => {
          const isSelected = selectedUnitIds.includes(
            unit.unitId
          );
          const isFull =
            !isSelected &&
            selectedUnitIds.length >= targetCount;

          return (
            <DispatchUnitCard
              key={unit.unitId}
              image={image}
              isDisabled={unit.isAssigned || isFull}
              isSelected={isSelected}
              onToggle={() => onToggle(unit.unitId)}
              unit={unit}
            />
          );
        })}
      </div>
    </fieldset>
  );
};

export default DispatchUnitGrid;
