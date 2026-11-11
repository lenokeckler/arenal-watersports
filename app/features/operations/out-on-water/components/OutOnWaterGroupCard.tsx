import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { formatCostaRicaTime } from "@/app/components/dispatch-board/utils/formatCostaRicaTime";
import {
  DURATION_ADJUST_COPY,
  OUT_ON_WATER_COPY,
} from "../constants/OutOnWaterCopy.constants";
import type { OutOnWaterGroupCardProps } from "../models/OutOnWaterGroupCardProps.interface";
import {
  OUT_ON_WATER_CARD_CLASS,
  OUT_ON_WATER_CARD_DETAIL_CLASS,
  OUT_ON_WATER_ACTIONS_CLASS,
  OUT_ON_WATER_CARD_HEADING_CLASS,
  OUT_ON_WATER_EXTENDED_CLASS,
  OUT_ON_WATER_REMAINING_CLASS,
} from "../styles/OutOnWater.styles";
import { formatDuration } from "../utils/formatDuration";
import { formatRemainingTime } from "../utils/formatRemainingTime";
import { getGroupEquipmentText } from "../utils/getGroupEquipmentText";
import { getRemainingMinutes } from "../utils/getRemainingMinutes";
import OutOnWaterAdjustAction from "./OutOnWaterAdjustAction";
import OutOnWaterCloseAction from "./OutOnWaterCloseAction";
import OutOnWaterOverdueBadge from "./OutOnWaterOverdueBadge";
import type { JSX } from "react";

const OutOnWaterGroupCard = ({
  group,
  now,
}: OutOnWaterGroupCardProps): JSX.Element => {
  const remainingMinutes = getRemainingMinutes(
    group.endsAt,
    now
  );

  return (
    <div className={OUT_ON_WATER_CARD_CLASS}>
      <Title
        variant={TitleVariant.SECONDARY}
        text={`${group.customerName}${OUT_ON_WATER_COPY.RESERVATION_SEPARATOR}${group.code}`}
        className={OUT_ON_WATER_CARD_HEADING_CLASS}
      />
      <Text className={OUT_ON_WATER_CARD_DETAIL_CLASS}>
        {getGroupEquipmentText(group)}
      </Text>
      <Text className={OUT_ON_WATER_CARD_DETAIL_CLASS}>
        {`${OUT_ON_WATER_COPY.DEPARTED_AT}${formatCostaRicaTime(group.dispatchedAt)}${OUT_ON_WATER_COPY.TIMES_SEPARATOR}${OUT_ON_WATER_COPY.RETURNS_AT}${formatCostaRicaTime(group.endsAt)}`}
      </Text>
      {remainingMinutes > 0 ? (
        <Text className={OUT_ON_WATER_REMAINING_CLASS}>
          {formatRemainingTime(remainingMinutes)}
        </Text>
      ) : (
        <OutOnWaterOverdueBadge
          delayMinutes={-remainingMinutes}
        />
      )}
      {group.extendedMinutes > 0 && (
        <Text className={OUT_ON_WATER_EXTENDED_CLASS}>
          {`${DURATION_ADJUST_COPY.EXTENDED_PREFIX}${formatDuration(group.extendedMinutes)}. ${DURATION_ADJUST_COPY.EXTENDED_NOTE}`}
        </Text>
      )}
      <div className={OUT_ON_WATER_ACTIONS_CLASS}>
        <OutOnWaterCloseAction group={group} />
        <OutOnWaterAdjustAction group={group} />
      </div>
    </div>
  );
};

export default OutOnWaterGroupCard;
