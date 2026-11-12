export interface DispatchSheetProps {
  customerName: string;
  initialCategoryId?: string;
  onClose: () => void;
  onDispatched: () => void;
  preselectedUnitIds?: string[];
  reservationId: string;
}
