import type { ExtraCompatibilityReference } from "./ExtraCompatibilityReference.interface";
import type { ExtraCompatibilityUnit } from "./ExtraCompatibilityUnit.interface";

export interface ExtraCompatibilityCategory extends ExtraCompatibilityReference {
  unitCount: number;
  linkedUnitCount: number;
  units: ExtraCompatibilityUnit[];
}
