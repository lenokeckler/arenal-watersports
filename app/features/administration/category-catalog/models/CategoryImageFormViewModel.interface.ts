import type { NullableRef } from "@/app/types";
import type { CategoryImageFormState } from "../constants/CategoryImageFormState.constants";

export interface CategoryImageFormViewModel {
  formState: CategoryImageFormState;
  previewUrl: NullableRef<string>;
  errorMessage: NullableRef<string>;
  isSubmitting: boolean;
  isConfirmingRemoval: boolean;
  onPickFile: (file: File) => void;
  onSave: () => Promise<void>;
  onRequestRemoval: () => void;
  onConfirmRemoval: () => Promise<void>;
  onCancelRemoval: () => void;
  onBack: () => void;
}
