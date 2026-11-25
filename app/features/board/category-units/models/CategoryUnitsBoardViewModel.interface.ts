import type { NullableRef } from "@/app/types";

export interface CategoryUnitsBoardViewModel {
  handleCloseInfo: () => void;
  handleCloseModify: () => void;
  handleCloseReceive: () => void;
  handleOpenInfo: (unitId: string) => void;
  handleOpenModify: (unitId: string) => void;
  handleOpenReceive: (unitId: string) => void;
  handleToggleEditing: () => void;
  infoUnitId: NullableRef<string>;
  isEditing: boolean;
  modifyUnitId: NullableRef<string>;
  receiveUnitId: NullableRef<string>;
}
