export interface CategoryUnitInteraction {
  isEditing: boolean;
  onOpenInfo: (unitId: string) => void;
  onOpenModify: (unitId: string) => void;
  onOpenStatus: (unitId: string) => void;
}
