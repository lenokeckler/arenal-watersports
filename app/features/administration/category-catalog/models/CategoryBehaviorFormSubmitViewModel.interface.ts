export interface CategoryBehaviorFormSubmitViewModel {
  isSubmitting: boolean;
  onSubmit: (event: React.FormEvent) => Promise<void>;
}
