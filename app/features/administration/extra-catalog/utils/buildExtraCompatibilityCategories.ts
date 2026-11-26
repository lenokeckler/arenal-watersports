import { LENGTH } from "@/app/constants";
import type { ExtraCompatibilityCategory } from "../models/ExtraCompatibilityCategory.interface";
import type { ExtraCompatibilityCategoryRow } from "../models/ExtraCompatibilityCategoryRow.type";
import { excludeDecommissionedUnits } from "./excludeDecommissionedUnits";

export const buildExtraCompatibilityCategories = (
  categoryRows: ExtraCompatibilityCategoryRow[],
  linkedUnitIds: ReadonlySet<string>
): ExtraCompatibilityCategory[] =>
  categoryRows
    .map((categoryRow) => {
      const unitRows = excludeDecommissionedUnits(
        categoryRow.equipment_units
      );
      return {
        id: categoryRow.id,
        name: categoryRow.name,
        unitCount: unitRows.length,
        linkedUnitCount: unitRows.filter((unitRow) =>
          linkedUnitIds.has(unitRow.id)
        ).length,
      };
    })
    .filter((category) => category.unitCount > LENGTH.ZERO);
