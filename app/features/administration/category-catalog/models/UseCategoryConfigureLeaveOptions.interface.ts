export interface UseCategoryConfigureLeaveOptions {
  name: string;
  changedCount: number;
  onSave: () => Promise<boolean>;
}
