export interface CustomComboUnitExtrasProps {
  extraIds: string[];
  onToggle: (unitId: string, extraId: string) => void;
  unitId: string;
}
