import type { ExtraCompatibilityUnit } from "../models/ExtraCompatibilityUnit.interface";
import type { ExtraCompatibilityUnitRow } from "../models/ExtraCompatibilityUnitRow.type";
import { excludeDecommissionedUnits } from "./excludeDecommissionedUnits";

export const buildExtraCompatibilityUnits = (
  unitRows: ExtraCompatibilityUnitRow[],
  linkedUnitIds: ReadonlySet<string>
): ExtraCompatibilityUnit[] =>
  excludeDecommissionedUnits(unitRows).map((unitRow) => ({
    ...unitRow,
    isLinked: linkedUnitIds.has(unitRow.id),
  }));
