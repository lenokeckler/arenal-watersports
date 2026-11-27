export interface UnitPhotoDeleteViewModel {
  cancel: () => void;
  confirm: () => Promise<void>;
  isConfirming: boolean;
  isDeleting: boolean;
  request: () => void;
}
