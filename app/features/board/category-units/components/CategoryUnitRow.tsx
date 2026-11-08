import { Title } from "@/app/components";
import { TitleVariant } from "@/app/constants";
import type { CategoryUnitRowProps } from "../models/CategoryUnitRowProps.interface";
import {
  CATEGORY_UNIT_ROW_BADGES_CLASS,
  CATEGORY_UNIT_ROW_CODE_CLASS,
  CATEGORY_UNIT_ROW_HEADER_CLASS,
  resolveCategoryUnitRowClass,
} from "../styles/CategoryUnitRow.styles";
import CategoryUnitOverdueChip from "./CategoryUnitOverdueChip";
import CategoryUnitReservation from "./CategoryUnitReservation";
import CategoryUnitStatusChip from "./CategoryUnitStatusChip";

const CategoryUnitRow = ({
  unit,
}: CategoryUnitRowProps): React.JSX.Element => (
  <div
    className={resolveCategoryUnitRowClass(
      Boolean(unit.occupancy?.isOverdue)
    )}
  >
    <div className={CATEGORY_UNIT_ROW_HEADER_CLASS}>
      <Title
        variant={TitleVariant.SECONDARY}
        text={unit.code}
        className={CATEGORY_UNIT_ROW_CODE_CLASS}
      />
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
