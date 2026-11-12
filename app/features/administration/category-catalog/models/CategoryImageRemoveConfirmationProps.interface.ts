export interface CategoryImageRemoveConfirmationProps {
  isRemoving: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}
