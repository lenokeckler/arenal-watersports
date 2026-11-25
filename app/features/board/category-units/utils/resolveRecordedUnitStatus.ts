import type { ActiveInventoryUnitStatus } from "@/app/constants";
import type { Database } from "@/app/types";
import { CATEGORY_UNIT_RECORDED_STATUS } from "../constants/CategoryUnits.constants";

export const resolveRecordedUnitStatus = (
  status: ActiveInventoryUnitStatus
): Database["public"]["Enums"]["unit_status"] =>
  status === CATEGORY_UNIT_RECORDED_STATUS.OCCUPIED
    ? CATEGORY_UNIT_RECORDED_STATUS.FALLBACK
    : status;
