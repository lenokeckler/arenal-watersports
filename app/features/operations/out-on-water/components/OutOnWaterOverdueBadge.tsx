import Text from "@/app/components/text/Text";
import { OUT_ON_WATER_COPY } from "../constants/OutOnWaterCopy.constants";
import type { OutOnWaterOverdueBadgeProps } from "../models/OutOnWaterOverdueBadgeProps.interface";
import {
  OUT_ON_WATER_OVERDUE_BADGE_CLASS,
  OUT_ON_WATER_OVERDUE_DELAY_CLASS,
} from "../styles/OutOnWater.styles";
import { formatDelay } from "../utils/formatDelay";
import type { JSX } from "react";

const OutOnWaterOverdueBadge = ({
  delayMinutes,
}: OutOnWaterOverdueBadgeProps): JSX.Element => (
  <div className={OUT_ON_WATER_OVERDUE_BADGE_CLASS}>
    <Text bold>{OUT_ON_WATER_COPY.OVERDUE_LABEL}</Text>
    {delayMinutes > 0 && (
      <Text className={OUT_ON_WATER_OVERDUE_DELAY_CLASS}>
        {formatDelay(delayMinutes)}
      </Text>
    )}
  </div>
);

export default OutOnWaterOverdueBadge;
