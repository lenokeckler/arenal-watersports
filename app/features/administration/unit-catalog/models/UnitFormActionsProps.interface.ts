import type { UnitFormMode } from "../constants/UnitFormMode.constants";

export interface UnitFormActionsProps {
  mode: UnitFormMode;
  isSubmitting: boolean;
  onBack: () => void;
}
