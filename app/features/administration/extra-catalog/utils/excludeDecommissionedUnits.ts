import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import type { ExtraCompatibilityUnitRow } from "../models/ExtraCompatibilityUnitRow.type";

export const excludeDecommissionedUnits = (
  unitRows: ExtraCompatibilityUnitRow[]
): ExtraCompatibilityUnitRow[] =>
  unitRows.filter(
    (unitRow) =>
      unitRow.status !==
      INVENTORY_UNIT_STATUS.DECOMMISSIONED
  );
