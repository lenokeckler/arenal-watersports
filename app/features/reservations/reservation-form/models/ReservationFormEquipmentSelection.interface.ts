export interface ReservationFormEquipmentSelection {
  handleCategoryChange: (value: string) => void;
  handleUnitChange: (value: string) => void;
  hasEquipmentSelectionChanged: boolean;
}
