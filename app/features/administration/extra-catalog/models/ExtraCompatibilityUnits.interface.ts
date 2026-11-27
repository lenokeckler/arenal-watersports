import type { ExtraCompatibilityReference } from "./ExtraCompatibilityReference.interface";
import type { ExtraCompatibilityUnit } from "./ExtraCompatibilityUnit.interface";

export interface ExtraCompatibilityUnits {
  extra: ExtraCompatibilityReference;
  category: ExtraCompatibilityReference;
  units: ExtraCompatibilityUnit[];
}
