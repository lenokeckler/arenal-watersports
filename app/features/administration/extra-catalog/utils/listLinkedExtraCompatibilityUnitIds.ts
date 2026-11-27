import type { ExtraCompatibilityUnit } from "../models/ExtraCompatibilityUnit.interface";
import { listExtraCompatibilityUnitIds } from "./listExtraCompatibilityUnitIds";

export const listLinkedExtraCompatibilityUnitIds = (
  units: ExtraCompatibilityUnit[]
): string[] =>
  listExtraCompatibilityUnitIds(
    units.filter((unit) => unit.isLinked)
  );
