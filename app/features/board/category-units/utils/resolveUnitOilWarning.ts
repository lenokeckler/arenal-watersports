import type { OilRemainingProps } from "@/app/components/oil-remaining/models/OilRemainingProps.interface";
import type { NullableRef } from "@/app/types";
import type { CategoryUnit } from "../models/CategoryUnit.interface";

export const resolveUnitOilWarning = ({
  readings,
}: CategoryUnit): NullableRef<OilRemainingProps> =>
  readings === null ||
  readings.oilRemaining === null ||
  readings.usageMetric === null
    ? null
    : {
        metric: readings.usageMetric,
        remaining: readings.oilRemaining,
      };
