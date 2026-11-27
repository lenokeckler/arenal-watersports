import OilRemaining from "@/app/components/oil-remaining/OilRemaining";
import Text from "@/app/components/text/Text";
import type { NullableRef } from "@/app/types";
import { UNIT_HISTORY_COPY } from "../constants/UnitHistoryCopy.constants";
import type { UnitHistoryUnitProps } from "../models/UnitHistoryUnitProps.interface";
import { formatUnitReading } from "../utils/formatUnitReading";
import { UNIT_HISTORY_META_CLASS } from "../styles/UnitHistory.styles";
import type { JSX } from "react";

const UnitHistoryNextOil = ({
  unit: { nextOilChangeAt, usageMetric, usageTotal },
}: UnitHistoryUnitProps): NullableRef<JSX.Element> =>
  usageMetric && nextOilChangeAt !== null ? (
    <Text className={UNIT_HISTORY_META_CLASS}>
      {UNIT_HISTORY_COPY.NEXT_OIL(
        formatUnitReading(nextOilChangeAt, usageMetric)
      )}{" "}
      <OilRemaining
        metric={usageMetric}
        remaining={nextOilChangeAt - usageTotal}
      />
    </Text>
  ) : null;

export default UnitHistoryNextOil;
