import { STRING } from "@/app/constants";
import { UNIT_LIST_COPY } from "../constants/UnitListCopy.constants";
import { UNIT_USAGE_UNIT_LABEL } from "../constants/UnitUsageUnitLabel.constants";
import type { UnitCardMotorTexts } from "../models/UnitCardMotorTexts.interface";
import type { UnitCategory } from "../models/UnitCategory.interface";
import type { UnitListItem } from "../models/UnitListItem.interface";

const NO_MOTOR_TEXTS: UnitCardMotorTexts = {
  fuelText: null,
  oilChangeText: null,
  usageText: null,
};

const joinWords = (
  ...words: Array<string | number>
): string => words.join(STRING.SPACE);

export const buildUnitCardMotorTexts = (
  unit: UnitListItem,
  category: UnitCategory
): UnitCardMotorTexts => {
  if (!category.hasMotor) {
    return NO_MOTOR_TEXTS;
  }

  const usageUnitLabel = category.usageMetric
    ? UNIT_USAGE_UNIT_LABEL[category.usageMetric]
    : STRING.Empty;
  const fuelReading =
    unit.fuelLevel === null
      ? UNIT_LIST_COPY.FUEL_NO_READING
      : joinWords(
          unit.fuelLevel,
          UNIT_LIST_COPY.FUEL_LEVEL_OF,
          unit.fuelMax
        );

  return {
    fuelText: joinWords(
      UNIT_LIST_COPY.FUEL_LABEL,
      fuelReading
    ),
    oilChangeText:
      unit.nextOilChangeAt === null
        ? null
        : joinWords(
            UNIT_LIST_COPY.NEXT_OIL_CHANGE_LABEL,
            unit.nextOilChangeAt,
            usageUnitLabel
          ).trim(),
    usageText: joinWords(
      UNIT_LIST_COPY.USAGE_LABEL,
      unit.usageTotal,
      usageUnitLabel
    ).trim(),
  };
};
