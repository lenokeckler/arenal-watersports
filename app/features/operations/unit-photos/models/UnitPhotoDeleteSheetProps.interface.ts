export interface UnitPhotoDeleteSheetProps {
  angleLabel: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}
