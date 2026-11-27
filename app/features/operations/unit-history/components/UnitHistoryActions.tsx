import Link from "@/app/components/link/Link";
import { PATHS } from "@/app/constants";
import { UNIT_HISTORY_COPY } from "../constants/UnitHistoryCopy.constants";
import type { UnitHistoryUnitProps } from "../models/UnitHistoryUnitProps.interface";
import {
  UNIT_HISTORY_ACTIONS_CLASS,
  UNIT_HISTORY_ACTION_CLASS,
} from "../styles/UnitHistory.styles";
import type { JSX } from "react";

const UnitHistoryActions = ({
  unit: { hasPhotos, id },
}: UnitHistoryUnitProps): JSX.Element => (
  <div className={UNIT_HISTORY_ACTIONS_CLASS}>
    <Link
      href={PATHS.OPERATIONS.MAINTENANCE_NEW_FOR_UNIT(id)}
      className={UNIT_HISTORY_ACTION_CLASS}
    >
      {UNIT_HISTORY_COPY.REGISTER_JOB}
    </Link>
    <Link
      href={PATHS.OPERATIONS.DAMAGE_REPORT_FOR_UNIT(id)}
      className={UNIT_HISTORY_ACTION_CLASS}
    >
      {UNIT_HISTORY_COPY.REPORT_DAMAGE}
    </Link>
    {hasPhotos && (
      <Link
        href={PATHS.OPERATIONS.UNIT_PHOTOS(id)}
        className={UNIT_HISTORY_ACTION_CLASS}
      >
        {UNIT_HISTORY_COPY.VIEW_PHOTOS}
      </Link>
    )}
  </div>
);

export default UnitHistoryActions;
