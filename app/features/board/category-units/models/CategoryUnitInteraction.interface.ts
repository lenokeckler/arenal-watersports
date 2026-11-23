export interface CategoryUnitInteraction {
  isEditing: boolean;
  onOpenInfo: (unitId: string) => void;
  onOpenModify: (unitId: string) => void;
}
