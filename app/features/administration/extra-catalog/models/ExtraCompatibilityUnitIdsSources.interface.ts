import type { ExtraCompatibilityUnitRow } from "./ExtraCompatibilityUnitRow.type";

export interface ExtraCompatibilityUnitIdsSources {
  currentLinkedIds: string[];
  categoryUnitRows: ExtraCompatibilityUnitRow[];
  selectedUnitIds: string[];
}
