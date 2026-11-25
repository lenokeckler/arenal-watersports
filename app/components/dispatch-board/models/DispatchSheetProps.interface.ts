export interface DispatchSheetProps {
  customerName: string;
  initialCategoryId?: string;
  isCombo?: boolean;
  onClose: () => void;
  onDispatched: () => void;
  preselectedUnitIds?: string[];
  reservationId: string;
}
