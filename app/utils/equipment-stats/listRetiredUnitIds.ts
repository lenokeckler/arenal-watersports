import type { UnitRetirement } from "./models/UnitRetirement.interface";

export const listRetiredUnitIds = (
  records: UnitRetirement[]
): Set<string> =>
  new Set(
    records
      .filter((record) => record.isRetired)
      .map((record) => record.unitId)
  );
