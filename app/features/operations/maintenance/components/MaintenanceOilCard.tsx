import Link from "@/app/components/link/Link";
import OilRemaining from "@/app/components/oil-remaining/OilRemaining";
import Text from "@/app/components/text/Text";
import Title from "@/app/components/title/Title";
import { TitleVariant } from "@/app/constants";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceUnitCardProps } from "../models/MaintenanceUnitCardProps.interface";
import {
  MAINTENANCE_CARD_CLASS,
  MAINTENANCE_CARD_HEADING_CLASS,
  MAINTENANCE_CARD_LINK_CLASS,
  MAINTENANCE_OIL_CAPTION_CLASS,
  MAINTENANCE_OIL_COLUMN_CLASS,
  MAINTENANCE_OIL_COLUMNS_CLASS,
  MAINTENANCE_OIL_HEADER_CLASS,
  MAINTENANCE_OIL_VALUE_CLASS,
} from "../styles/Maintenance.styles";
import { formatUsage } from "../utils/formatUsage";
import { getUnitDamageReportsHref } from "../utils/getUnitDamageReportsHref";
import type { JSX } from "react";

const MaintenanceOilCard = ({
  unit,
}: MaintenanceUnitCardProps): JSX.Element => (
  <div className={MAINTENANCE_CARD_CLASS}>
    <div className={MAINTENANCE_OIL_HEADER_CLASS}>
      <Title
        variant={TitleVariant.SECONDARY}
        text={`${unit.code}${MAINTENANCE_COPY.UNIT_SEPARATOR}${unit.categoryName}`}
        className={MAINTENANCE_CARD_HEADING_CLASS}
      />
      {unit.usageMetric !== null &&
        unit.oilRemaining !== null && (
          <OilRemaining
            metric={unit.usageMetric}
            remaining={unit.oilRemaining}
          />
        )}
    </div>
    {unit.usageMetric !== null && (
      <div className={MAINTENANCE_OIL_COLUMNS_CLASS}>
        <div className={MAINTENANCE_OIL_COLUMN_CLASS}>
          <Text className={MAINTENANCE_OIL_CAPTION_CLASS}>
            {
              MAINTENANCE_COPY.CURRENT_USAGE[
                unit.usageMetric
              ]
            }
          </Text>
          <Text className={MAINTENANCE_OIL_VALUE_CLASS}>
            {formatUsage(unit.usageTotal, unit.usageMetric)}
          </Text>
        </div>
        <div className={MAINTENANCE_OIL_COLUMN_CLASS}>
          <Text className={MAINTENANCE_OIL_CAPTION_CLASS}>
            {MAINTENANCE_COPY.NEXT_OIL_CHANGE}
          </Text>
          <Text className={MAINTENANCE_OIL_VALUE_CLASS}>
            {formatUsage(
              unit.nextOilChangeAt ?? 0,
              unit.usageMetric
            )}
          </Text>
        </div>
      </div>
    )}
    <Link
      href={getUnitDamageReportsHref(unit.unitId)}
      className={MAINTENANCE_CARD_LINK_CLASS}
    >
      {MAINTENANCE_COPY.VIEW_DAMAGE_REPORTS}
    </Link>
  </div>
);

export default MaintenanceOilCard;
