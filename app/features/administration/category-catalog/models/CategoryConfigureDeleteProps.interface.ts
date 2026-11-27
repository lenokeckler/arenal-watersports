export interface CategoryConfigureDeleteProps {
  name: string;
  isSheetOpen: boolean;
  isPending: boolean;
  canDeactivate: boolean;
  onOpen: () => void;
  onClose: () => void;
  onConfirm: () => void;
  onDeactivate: () => void;
}
