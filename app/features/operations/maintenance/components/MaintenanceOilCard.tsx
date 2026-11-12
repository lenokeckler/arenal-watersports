import Link from "@/app/components/link/Link";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceUnitCardProps } from "../models/MaintenanceUnitCardProps.interface";
import {
  MAINTENANCE_CARD_CLASS,
  MAINTENANCE_CARD_HEADING_CLASS,
  MAINTENANCE_CARD_LINK_CLASS,
  MAINTENANCE_OIL_TEXT_CLASS,
} from "../styles/Maintenance.styles";
import { getOilChangeText } from "../utils/getOilChangeText";
import { getOilState } from "../utils/getOilState";
import { getUnitDamageReportsHref } from "../utils/getUnitDamageReportsHref";
import type { JSX } from "react";

const MaintenanceOilCard = ({
  unit,
}: MaintenanceUnitCardProps): JSX.Element => (
  <div className={MAINTENANCE_CARD_CLASS}>
    <Title
      variant={TitleVariant.SECONDARY}
      text={`${unit.code}${MAINTENANCE_COPY.UNIT_SEPARATOR}${unit.categoryName}`}
      className={MAINTENANCE_CARD_HEADING_CLASS}
    />
    <Text
      className={
        MAINTENANCE_OIL_TEXT_CLASS[getOilState(unit)]
      }
    >
      {getOilChangeText(unit)}
    </Text>
    <Link
      href={getUnitDamageReportsHref(unit.unitId)}
      className={MAINTENANCE_CARD_LINK_CLASS}
    >
      {MAINTENANCE_COPY.VIEW_DAMAGE_REPORTS}
    </Link>
  </div>
);

export default MaintenanceOilCard;
