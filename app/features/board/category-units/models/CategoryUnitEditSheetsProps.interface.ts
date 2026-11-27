import type { NullableUndefined } from "@/app/types";
import type { CategoryUnit } from "./CategoryUnit.interface";

export interface CategoryUnitEditSheetsProps {
  hasPhotos: boolean;
  modifyUnit: NullableUndefined<CategoryUnit>;
  onCloseModify: () => void;
  onCloseStatus: () => void;
  statusUnit: NullableUndefined<CategoryUnit>;
}
