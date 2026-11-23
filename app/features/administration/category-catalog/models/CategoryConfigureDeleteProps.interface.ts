export interface CategoryConfigureDeleteProps {
  name: string;
  isSheetOpen: boolean;
  isPending: boolean;
  onOpen: () => void;
  onClose: () => void;
  onConfirm: () => void;
  onDeactivate: () => void;
}
