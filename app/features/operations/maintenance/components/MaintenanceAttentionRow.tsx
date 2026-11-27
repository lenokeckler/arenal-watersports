import Link from "@/app/components/link/Link";
import OilRemaining from "@/app/components/oil-remaining/OilRemaining";
import InlineText from "@/app/components/text/InlineText";
import {
  INVENTORY_UNIT_STATUS,
  PATHS,
} from "@/app/constants";
import { MAINTENANCE_COPY } from "../constants/MaintenanceCopy.constants";
import type { MaintenanceAttentionRowProps } from "../models/MaintenanceAttentionRowProps.interface";
import {
  MAINTENANCE_ATTEND_CODE_CLASS,
  MAINTENANCE_ATTEND_ROW_CLASS,
  MAINTENANCE_ATTEND_VALUES_CLASS,
  resolveMaintenanceStateClass,
} from "../styles/Maintenance.styles";
import type { JSX } from "react";

const MaintenanceAttentionRow = ({
  unit,
}: MaintenanceAttentionRowProps): JSX.Element => (
  <Link
    href={PATHS.OPERATIONS.UNIT_HISTORY(unit.unitId)}
    className={MAINTENANCE_ATTEND_ROW_CLASS}
  >
    <InlineText className={MAINTENANCE_ATTEND_CODE_CLASS}>
      {unit.code}
    </InlineText>
    <InlineText className={MAINTENANCE_ATTEND_VALUES_CLASS}>
      {unit.status !== INVENTORY_UNIT_STATUS.AVAILABLE && (
        <InlineText
          className={resolveMaintenanceStateClass(
            unit.status === INVENTORY_UNIT_STATUS.DAMAGED
          )}
        >
          {MAINTENANCE_COPY.STATUS[unit.status]}
        </InlineText>
      )}
      {unit.oilWarning &&
        unit.usageMetric !== null &&
        unit.oilRemaining !== null && (
          <OilRemaining
            metric={unit.usageMetric}
            remaining={unit.oilRemaining}
          />
        )}
    </InlineText>
  </Link>
);

export default MaintenanceAttentionRow;
