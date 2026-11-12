import type { CategoryImageFormState } from "../constants/CategoryImageFormState.constants";

export interface CategoryImageFormActionsProps {
  formState: CategoryImageFormState;
  isConfirmingRemoval: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onCancelRemoval: () => void;
  onConfirmRemoval: () => Promise<void>;
  onRequestRemoval: () => void;
  onSave: () => Promise<void>;
}
