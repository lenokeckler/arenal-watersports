export interface SubmissionLock {
  isSubmitting: boolean;
  runLocked: (task: () => Promise<void>) => Promise<void>;
}
