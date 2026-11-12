export interface CategoryImageRemovalViewModel {
  isConfirmingRemoval: boolean;
  isRemoving: boolean;
  requestRemoval: () => void;
  cancelRemoval: () => void;
  confirmRemoval: () => Promise<void>;
}
