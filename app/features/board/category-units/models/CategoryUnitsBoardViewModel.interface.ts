import type { NullableRef } from "@/app/types";

export interface CategoryUnitsBoardViewModel {
  handleCloseInfo: () => void;
  handleCloseModify: () => void;
  handleOpenInfo: (unitId: string) => void;
  handleOpenModify: (unitId: string) => void;
  handleToggleEditing: () => void;
  infoUnitId: NullableRef<string>;
  isEditing: boolean;
  modifyUnitId: NullableRef<string>;
}
