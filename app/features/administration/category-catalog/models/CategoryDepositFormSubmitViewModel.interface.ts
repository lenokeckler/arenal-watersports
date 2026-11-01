import { CategoryFormSubmitEvent } from "./CategoryFormSubmitEvent.type";

export interface CategoryDepositFormSubmitViewModel {
  isSubmitting: boolean;
  onSubmit: (
    event: CategoryFormSubmitEvent
  ) => Promise<void>;
}
