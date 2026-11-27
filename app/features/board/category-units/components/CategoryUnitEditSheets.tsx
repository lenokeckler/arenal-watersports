import type { CategoryUnitEditSheetsProps } from "../models/CategoryUnitEditSheetsProps.interface";
import CategoryUnitModifySheet from "./CategoryUnitModifySheet";
import CategoryUnitStatusSheet from "./CategoryUnitStatusSheet";
import type { JSX } from "react";

const CategoryUnitEditSheets = ({
  hasPhotos,
  modifyUnit,
  onCloseModify,
  onCloseStatus,
  statusUnit,
}: CategoryUnitEditSheetsProps): JSX.Element => (
  <>
    {statusUnit && (
      <CategoryUnitStatusSheet
        hasPhotos={hasPhotos}
        onClose={onCloseStatus}
        unit={statusUnit}
      />
    )}
    {modifyUnit && (
      <CategoryUnitModifySheet
        hasPhotos={hasPhotos}
        onClose={onCloseModify}
        readings={modifyUnit.readings}
        unit={modifyUnit}
      />
    )}
  </>
);

export default CategoryUnitEditSheets;
