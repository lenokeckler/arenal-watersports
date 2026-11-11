import type { ExtraFormMode } from "../constants/ExtraFormMode.constants";

export interface ExtraFormActionsProps {
  mode: ExtraFormMode;
  isSubmitting: boolean;
  onBack: () => void;
}
