import { InlineText, Text } from "@/app/components";
import FuelGauge from "@/app/components/fuel-gauge/FuelGauge";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import type { CategoryUnitReadingsProps } from "../models/CategoryUnitReadingsProps.interface";
import {
  CATEGORY_UNIT_ROW_READINGS_CLASS,
  CATEGORY_UNIT_ROW_USAGE_CLASS,
} from "../styles/CategoryUnitRow.styles";
import {
  CATEGORY_UNIT_ROW_FOOTER_CLASS,
  CATEGORY_UNIT_ROW_IMPACT_CLASS,
} from "../styles/CategoryUnitSheets.styles";
import { formatCategoryUnitUsage } from "../utils/formatCategoryUnitUsage";

const CategoryUnitReadings = ({
  readings,
}: CategoryUnitReadingsProps): React.JSX.Element => (
  <div className={CATEGORY_UNIT_ROW_READINGS_CLASS}>
    {readings.hasFuelGauge && (
      <FuelGauge
        level={readings.fuelLevel}
        lowLines={readings.lowFuelLines}
        max={readings.fuelMax}
      />
    )}
    <div className={CATEGORY_UNIT_ROW_FOOTER_CLASS}>
      {readings.usageMetric && (
        <Text className={CATEGORY_UNIT_ROW_USAGE_CLASS}>
          {formatCategoryUnitUsage(
            readings.usageTotal,
            readings.usageMetric
          )}
        </Text>
      )}
      <InlineText
        aria-label={CATEGORY_UNITS_COPY.IMPACT_COUNT_SPOKEN(
          readings.impactCount
        )}
        className={CATEGORY_UNIT_ROW_IMPACT_CLASS}
      >
        {CATEGORY_UNITS_COPY.IMPACT_COUNT_SHORT(
          readings.impactCount
        )}
      </InlineText>
    </div>
  </div>
);

export default CategoryUnitReadings;
