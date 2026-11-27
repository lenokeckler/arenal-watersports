import type { ExtraCompatibilityCategory } from "./ExtraCompatibilityCategory.interface";
import type { ExtraCompatibilityReference } from "./ExtraCompatibilityReference.interface";

export interface ExtraCompatibilityCategories {
  extra: ExtraCompatibilityReference;
  categories: ExtraCompatibilityCategory[];
}
