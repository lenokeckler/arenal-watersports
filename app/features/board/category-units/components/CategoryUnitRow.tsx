import { Title } from "@/app/components";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import {
  MATERIAL_ICON_NAME,
  TitleVariant,
} from "@/app/constants";
import type { CategoryUnitRowProps } from "../models/CategoryUnitRowProps.interface";
import {
  CATEGORY_UNIT_ROW_BADGES_CLASS,
  CATEGORY_UNIT_ROW_CODE_CLASS,
  CATEGORY_UNIT_ROW_HEADER_CLASS,
  CATEGORY_UNIT_ROW_TITLE_CLASS,
  resolveCategoryUnitRowClass,
  resolveCategoryUnitSelectMarkClass,
} from "../styles/CategoryUnitRow.styles";
import CategoryUnitOverdueChip from "./CategoryUnitOverdueChip";
import CategoryUnitReservation from "./CategoryUnitReservation";
import CategoryUnitStatusChip from "./CategoryUnitStatusChip";

const CategoryUnitRow = ({
  isSelectable = false,
  isSelected = false,
  unit,
}: CategoryUnitRowProps): React.JSX.Element => (
  <div
    className={resolveCategoryUnitRowClass(
      Boolean(unit.occupancy?.isOverdue),
      isSelected
    )}
  >
    <div className={CATEGORY_UNIT_ROW_HEADER_CLASS}>
      <div className={CATEGORY_UNIT_ROW_TITLE_CLASS}>
        {isSelectable && (
          <span
            aria-hidden
            className={resolveCategoryUnitSelectMarkClass(
              isSelected
            )}
          >
            <MaterialIcon name={MATERIAL_ICON_NAME.CHECK} />
          </span>
        )}
        <Title
          variant={TitleVariant.SECONDARY}
          text={unit.code}
          className={CATEGORY_UNIT_ROW_CODE_CLASS}
        />
      </div>
      <div className={CATEGORY_UNIT_ROW_BADGES_CLASS}>
        {unit.occupancy?.isOverdue && (
          <CategoryUnitOverdueChip />
        )}
        <CategoryUnitStatusChip status={unit.status} />
      </div>
    </div>
    {unit.occupancy && (
      <CategoryUnitReservation occupancy={unit.occupancy} />
    )}
  </div>
);

export default CategoryUnitRow;
