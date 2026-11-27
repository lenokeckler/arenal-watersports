import type { ExtraCompatibilityReference } from "./ExtraCompatibilityReference.interface";

export interface ExtraCompatibilityCategory extends ExtraCompatibilityReference {
  unitCount: number;
  linkedUnitCount: number;
}
