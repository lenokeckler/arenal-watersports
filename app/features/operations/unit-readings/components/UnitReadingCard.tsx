import FuelGauge from "@/app/components/fuel-gauge/FuelGauge";
import Link from "@/app/components/link/Link";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { PATHS, TitleVariant } from "@/app/constants";
import { UNIT_READINGS_COPY } from "../constants/UnitReadingsCopy.constants";
import type { UnitReadingCardProps } from "../models/UnitReadingCardProps.interface";
import {
  UNIT_READINGS_CARD_ALERT_CLASS,
  UNIT_READINGS_CARD_CLASS,
  UNIT_READINGS_CARD_DANGER_CLASS,
  UNIT_READINGS_CARD_DETAIL_CLASS,
  UNIT_READINGS_CARD_HEADING_CLASS,
  UNIT_READINGS_CARD_LINK_CLASS,
} from "../styles/UnitReadings.styles";
import { getUsageText } from "../utils/getUsageText";
import { isOilOverdue } from "../utils/isOilOverdue";
import { isOutOfService } from "../utils/isOutOfService";
import type { JSX } from "react";

const UnitReadingCard = ({
  unit,
}: UnitReadingCardProps): JSX.Element => (
  <div className={UNIT_READINGS_CARD_CLASS}>
    <Title
      id={`${UNIT_READINGS_COPY.TITLE_ID_PREFIX}${unit.id}`}
      variant={TitleVariant.SECONDARY}
      text={`${unit.code}${UNIT_READINGS_COPY.UNIT_SEPARATOR}${unit.categoryName}`}
      className={UNIT_READINGS_CARD_HEADING_CLASS}
    />
    <FuelGauge
      level={unit.fuelLevel}
      max={unit.fuelMax}
    />
    <Text className={UNIT_READINGS_CARD_DETAIL_CLASS}>
      {getUsageText(unit)}
    </Text>
    {isOilOverdue(unit) && (
      <Text className={UNIT_READINGS_CARD_ALERT_CLASS}>
        {UNIT_READINGS_COPY.OIL_OVERDUE}
      </Text>
    )}
    {isOutOfService(unit) && (
      <Text className={UNIT_READINGS_CARD_DANGER_CLASS}>
        {UNIT_READINGS_COPY.OUT_OF_SERVICE}
      </Text>
    )}
    <Link
      href={PATHS.OPERATIONS.UNIT_READING(unit.id)}
      className={UNIT_READINGS_CARD_LINK_CLASS}
    >
      {UNIT_READINGS_COPY.CORRECT}
    </Link>
  </div>
);

export default UnitReadingCard;
