import OilRemaining from "@/app/components/oil-remaining/OilRemaining";
import { Title } from "@/app/components";
import MaterialIcon from "@/app/components/icons/material-icon/MaterialIcon";
import {
  MATERIAL_ICON_NAME,
  TitleVariant,
} from "@/app/constants";
import type { CategoryUnitRowProps } from "../models/CategoryUnitRowProps.interface";
import {
  CATEGORY_UNIT_ROW_BADGES_CLASS,
  CATEGORY_UNIT_ROW_BODY_CLASS,
  CATEGORY_UNIT_ROW_CODE_CLASS,
  CATEGORY_UNIT_ROW_HEADER_CLASS,
  CATEGORY_UNIT_ROW_OVERLAY_CLASS,
  CATEGORY_UNIT_ROW_TITLE_CLASS,
  resolveCategoryUnitRowClass,
  CATEGORY_UNIT_SELECT_MARK_CLASS,
} from "../styles/CategoryUnitRow.styles";
import { CATEGORY_UNIT_EDIT_MARK_CLASS } from "../styles/CategoryUnitSheets.styles";
import { resolveUnitOilWarning } from "../utils/resolveUnitOilWarning";
import { isInactiveCategoryUnit } from "../utils/isInactiveCategoryUnit";
import CategoryUnitMedia from "./CategoryUnitMedia";
import CategoryUnitOverdueChip from "./CategoryUnitOverdueChip";
import CategoryUnitReadings from "./CategoryUnitReadings";
import CategoryUnitReturnBadge from "./CategoryUnitReturnBadge";
import CategoryUnitStatusChip from "./CategoryUnitStatusChip";

const CategoryUnitRow = ({
  image,
  isEditable = false,
  isSelected = false,
  unit,
}: CategoryUnitRowProps): React.JSX.Element => {
  const oilWarning = resolveUnitOilWarning(unit);

  return (
    <div
      className={resolveCategoryUnitRowClass(
        unit.status,
        Boolean(unit.occupancy?.isOverdue),
        isSelected
      )}
    >
      {isSelected && (
        <span
          aria-hidden
          className={CATEGORY_UNIT_SELECT_MARK_CLASS}
        >
          <MaterialIcon name={MATERIAL_ICON_NAME.CHECK} />
        </span>
      )}
      {isEditable && (
        <span
          aria-hidden
          className={CATEGORY_UNIT_EDIT_MARK_CLASS}
        >
          <MaterialIcon name={MATERIAL_ICON_NAME.EDIT} />
        </span>
      )}
      <CategoryUnitMedia
        image={image}
        isDimmed={Boolean(unit.occupancy)}
        isMuted={isInactiveCategoryUnit(unit.status)}
      >
        {unit.occupancy && (
          <div className={CATEGORY_UNIT_ROW_OVERLAY_CLASS}>
            <CategoryUnitReturnBadge
              isOverdue={unit.occupancy.isOverdue}
              returnsAt={unit.occupancy.returnsAt}
            />
            {unit.occupancy.isOverdue && (
              <CategoryUnitOverdueChip />
            )}
          </div>
        )}
      </CategoryUnitMedia>
      <div className={CATEGORY_UNIT_ROW_BODY_CLASS}>
        <div className={CATEGORY_UNIT_ROW_HEADER_CLASS}>
          <div className={CATEGORY_UNIT_ROW_TITLE_CLASS}>
            <Title
              variant={TitleVariant.SECONDARY}
              text={unit.code}
              className={CATEGORY_UNIT_ROW_CODE_CLASS}
            />
            {oilWarning && <OilRemaining {...oilWarning} />}
          </div>
          <div className={CATEGORY_UNIT_ROW_BADGES_CLASS}>
            <CategoryUnitStatusChip status={unit.status} />
          </div>
        </div>
        {unit.readings && (
          <CategoryUnitReadings readings={unit.readings} />
        )}
      </div>
    </div>
  );
};

export default CategoryUnitRow;
