import { CategoryFormSubmitEvent } from "./CategoryFormSubmitEvent.type";

export interface CategoryAlertFormSubmitViewModel {
  isSubmitting: boolean;
  onSubmit: (
    event: CategoryFormSubmitEvent
  ) => Promise<void>;
}
