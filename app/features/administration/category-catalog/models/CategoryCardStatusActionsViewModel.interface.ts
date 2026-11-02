export interface CategoryCardStatusActionsViewModel {
  onMarkInactiveClick: (
    categoryId: string
  ) => () => Promise<void>;
  onReactivateClick: (
    categoryId: string
  ) => () => Promise<void>;
}
