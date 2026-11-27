import type { ExtraCompatibilityUnitOption } from "./ExtraCompatibilityUnitOption.interface";

export interface ExtraCompatibilityUnitCheckboxRowProps {
  isSubmitting: boolean;
  onToggleUnit: (unitId: string) => void;
  option: ExtraCompatibilityUnitOption;
}
