import type { ExtraCompatibilityUnitOption } from "./ExtraCompatibilityUnitOption.interface";

export interface ExtraCompatibilityUnitsListProps {
  isSubmitting: boolean;
  onToggleUnit: (unitId: string) => void;
  options: ExtraCompatibilityUnitOption[];
}
