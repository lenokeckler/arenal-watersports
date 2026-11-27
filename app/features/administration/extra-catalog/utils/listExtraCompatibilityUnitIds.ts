import type { ExtraCompatibilityUnit } from "../models/ExtraCompatibilityUnit.interface";

export const listExtraCompatibilityUnitIds = (
  units: ExtraCompatibilityUnit[]
): string[] => units.map((unit) => unit.id);
