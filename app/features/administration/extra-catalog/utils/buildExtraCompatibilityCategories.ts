import { LENGTH } from "@/app/constants";
import type { ExtraCompatibilityCategory } from "../models/ExtraCompatibilityCategory.interface";
import type { ExtraCompatibilityCategoryRow } from "../models/ExtraCompatibilityCategoryRow.type";
import { buildExtraCompatibilityUnits } from "./buildExtraCompatibilityUnits";

export const buildExtraCompatibilityCategories = (
  categoryRows: ExtraCompatibilityCategoryRow[],
  linkedUnitIds: ReadonlySet<string>
): ExtraCompatibilityCategory[] =>
  categoryRows
    .map((categoryRow) => {
      const units = buildExtraCompatibilityUnits(
        categoryRow.equipment_units,
        linkedUnitIds
      );
      return {
        id: categoryRow.id,
        name: categoryRow.name,
        unitCount: units.length,
        linkedUnitCount: units.filter(
          (unit) => unit.isLinked
        ).length,
        units,
      };
    })
    .filter((category) => category.unitCount > LENGTH.ZERO);
