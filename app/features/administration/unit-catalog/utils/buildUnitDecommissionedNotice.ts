import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import { UNIT_DECOMMISSION_COPY } from "../constants/UnitDecommissionCopy.constants";
import { UNIT_DECOMMISSION_DATE_FORMAT } from "../constants/UnitDecommissionDateFormat.constants";
import type { Unit } from "../models/Unit.interface";

export const buildUnitDecommissionedNotice = (
  unit: Unit
): NullableRef<string> => {
  if (!unit.decommissionedAt) {
    return null;
  }

  const decommissionedDate = new Intl.DateTimeFormat(
    UNIT_DECOMMISSION_DATE_FORMAT.LOCALE,
    UNIT_DECOMMISSION_DATE_FORMAT.OPTIONS
  ).format(new Date(unit.decommissionedAt));

  return [
    `${UNIT_DECOMMISSION_COPY.DECOMMISSIONED_NOTICE_PREFIX} ${decommissionedDate}.`,
    UNIT_DECOMMISSION_COPY.REASON_NOTICE_PREFIX,
    safeString(unit.decommissionReason),
  ].join(STRING.SPACE);
};
