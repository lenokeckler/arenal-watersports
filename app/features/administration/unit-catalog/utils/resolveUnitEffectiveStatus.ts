import type { NullableUndefined } from "@/app/types";
import {
  UNIT_EFFECTIVE_STATUS,
  type UnitEffectiveStatus,
  type UnitStatus,
} from "../constants/UnitStatus.constants";

export const resolveUnitEffectiveStatus = (
  recordedStatus: UnitStatus,
  viewStatus: NullableUndefined<string>
): UnitEffectiveStatus =>
  viewStatus === UNIT_EFFECTIVE_STATUS.OCCUPIED
    ? UNIT_EFFECTIVE_STATUS.OCCUPIED
    : recordedStatus;
