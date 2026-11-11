import { CategoryBehaviorFieldAvailability } from "./CategoryBehaviorFieldAvailability.interface";
import { CategoryBehaviorFieldHandlers } from "./CategoryBehaviorFieldHandlers.interface";
import { CategoryBehaviorFormErrors } from "./CategoryBehaviorFormErrors.interface";
import { CategoryBehaviorFormValues } from "./CategoryBehaviorFormValues.interface";
import { CategoryTrackingMode } from "./CategoryTrackingMode.type";

export interface CategoryBehaviorFormViewModel extends CategoryBehaviorFieldHandlers {
  values: CategoryBehaviorFormValues;
  errors: CategoryBehaviorFormErrors;
  availability: CategoryBehaviorFieldAvailability;
  readonly trackingMode: CategoryTrackingMode;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (event: React.FormEvent) => Promise<void>;
}
