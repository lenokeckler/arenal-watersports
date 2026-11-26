"use client";

import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/components/button/constants";
import FuelGauge from "@/app/components/fuel-gauge/FuelGauge";
import { Image } from "@/app/components";
import Text from "@/app/components/text/Text";
import { ARIA_ROLE, BUTTON_TYPES } from "@/app/constants";
import { DISPATCH_UNIT_IMAGE } from "../constants/DispatchGroupSteps.constants";
import { DISPATCH_SHEET_COPY } from "../constants/DispatchSheetCopy.constants";
import type { DispatchSelectedUnitsProps } from "../models/DispatchSelectedUnitsProps.interface";
import {
  DISPATCH_SELECTED_BODY_CLASS,
  DISPATCH_SELECTED_CODE_CLASS,
  DISPATCH_SELECTED_IMAGE_CLASS,
  DISPATCH_SELECTED_LIST_CLASS,
  DISPATCH_SELECTED_ROW_CLASS,
} from "../styles/DispatchSelectedUnits.styles";
import { DISPATCH_SHEET_UNIT_NOTE_CLASS } from "../styles/DispatchSheet.styles";
import { resolveDispatchGroupImage } from "../utils/resolveDispatchGroupImage";

const DispatchSelectedUnits = ({
  fuel,
  group,
  onChangeUnits,
  selectedUnitIds,
}: DispatchSelectedUnitsProps): React.JSX.Element => {
  const image = resolveDispatchGroupImage(group);
  const units = group.candidateUnits.filter((unit) =>
    selectedUnitIds.includes(unit.unitId)
  );

  return (
    <div className={DISPATCH_SELECTED_LIST_CLASS}>
      {units.map((unit) => {
        const fuelRow = fuel.rows.find(
          (row) => row.unitId === unit.unitId
        );

        return (
          <div
            key={unit.unitId}
            role={ARIA_ROLE.GROUP}
            aria-label={unit.code}
            className={DISPATCH_SELECTED_ROW_CLASS}
          >
            {image && (
              <Image
                alt={image.alt}
                className={DISPATCH_SELECTED_IMAGE_CLASS}
                height={DISPATCH_UNIT_IMAGE.HEIGHT}
                sizes={DISPATCH_UNIT_IMAGE.SIZES}
                src={image.source}
                width={DISPATCH_UNIT_IMAGE.WIDTH}
                priority={false}
              />
            )}
            <div className={DISPATCH_SELECTED_BODY_CLASS}>
              <Text
                className={DISPATCH_SELECTED_CODE_CLASS}
              >
                {unit.code}
              </Text>
              {fuelRow && (
                <FuelGauge
                  level={fuelRow.fuelLevel}
                  lowLines={fuelRow.lowFuelLines}
                  max={fuelRow.fuelMax}
                  onSelectLevel={(level) =>
                    fuel.handleLevelChange(
                      unit.unitId,
                      level
                    )
                  }
                />
              )}
              {fuelRow && fuelRow.fuelLevel === null && (
                <Text
                  className={DISPATCH_SHEET_UNIT_NOTE_CLASS}
                >
                  {DISPATCH_SHEET_COPY.FUEL_MISSING}
                </Text>
              )}
            </div>
          </div>
        );
      })}
      {group.fixedUnitIds.length === 0 && (
        <Button
          type={BUTTON_TYPES.BUTTON}
          variant={BUTTON.BASE}
          onClick={onChangeUnits}
        >
          {DISPATCH_SHEET_COPY.CHANGE_UNITS}
        </Button>
      )}
    </div>
  );
};

export default DispatchSelectedUnits;
