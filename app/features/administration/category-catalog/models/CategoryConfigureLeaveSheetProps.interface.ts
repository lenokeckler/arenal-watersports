export interface CategoryConfigureLeaveSheetProps {
  body: string;
  isSaving: boolean;
  onSaveAndLeave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
}
